import bcryptjs from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
import TempUser from "../models/temp.user.model.js";

dotenv.config();

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || email === "") {
      return next(errorHandler(400, "All fields are required"));
    }
    const user = await User.findOne({ email });

    if (user) {
      return next(errorHandler(409, "Existing email"));
    }

    if (!username || !password || username === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }

    const randomSuffix = Math.random().toString(36).substring(2, 5);
    const finalUserName = username + randomSuffix;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username: finalUserName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json("New user created sucessfully");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(404, "All fields are required"));
  }
  const validUser = await User.findOne({ email });
  try {
    if (!validUser) {
      return next(errorHandler(404, "Invalid Credentials"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const { password: passcode, ...rest } = validUser._doc;
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = (req, res) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ success: false, message: "Authentication failed" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://hello-dev.onrender.com/auth/google/callback"
        : "http://localhost:3000/auth/google/callback"
    );
  })(req, res);
};

const checkAuth = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Find the user based on the token ID
    User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ success: false, message: "Server error", error });
      });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Token verification failed", error });
  }
};

const forgotPassword = async (req, res, next) => {
  const { emailId } = req.body;
  const otpCreatedAt = new Date();

  const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  try {
    const user = await User.findOneAndUpdate(
      { email: emailId },
      { otp, otpCreatedAt },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: "Password Reset Request",
      html: `
    <div style="font-family: Roboto, sans-serif; font-size: 16px; color: #000000; max-width: 768px; margin: 48px auto 0; min-height: 100vh;">
          <img src="https://drive.google.com/uc?id=1DH3BNkiQ2U9pbdOpi_hQNZ1btUJu03wy" alt="Hello Dev logo" style="width: 12rem; margin-bottom: 32px; display: block; margin-left: auto; margin-right: auto;" />
          <p style="margin-bottom: 24px;">
            Please use the below One Time Password (OTP) to reset your password. This will be valid for 10 minutes only.
          </p>
          <p style="margin-bottom: 24px;">
            Your OTP to reset the password is: 
            <span style="font-weight: bold;">
              ${otp}
            </span>
          </p>
          <p style="margin-bottom: 24px;">
            If you are unable to change the password within 10 minutes of OTP generation, please click on "Forgot password?" and continue with the same process again.
          </p>
          <p>Regards,</p>
          <p>Hello Dev Team</p>
        </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

const authEmail = async (req, res, next) => {
  const { emailId } = req.body;
  const user = await User.findOne({ email: emailId });

  if (user) {
    return next(errorHandler(409, "Existing email"));
  }

  try {
    const otpCreatedAt = new Date();

    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const newTempUser = new TempUser({
      email: emailId,
      otp,
      otpCreatedAt,
    });
    await newTempUser.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: "Verify your email-id",
      html: `
    <div style="font-family: Roboto, sans-serif; font-size: 16px; color: #000000; max-width: 768px; margin: 48px auto 0; min-height: 100vh;">
          <img src="https://drive.google.com/uc?id=1DH3BNkiQ2U9pbdOpi_hQNZ1btUJu03wy" alt="Hello Dev logo" style="width: 12rem; margin-bottom: 32px; display: block; margin-left: auto; margin-right: auto;" />
          <p style="margin-bottom: 24px;">
            Please use the below One Time Password (OTP) to verify your email-id. This will be valid for 10 minutes only.
          </p>
          <p style="margin-bottom: 24px;">
            Your OTP to verify email-id is: 
            <span style="font-weight: bold;">
              ${otp}
            </span>
          </p>
          <p style="margin-bottom: 24px;">
            If you are unable to signup within 10 minutes of OTP generation, please go to sign-up page and continue with the same process again.
          </p>
          <p>Regards,</p>
          <p>Hello Dev Team</p>
        </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};

const checkSignupOtp = async (req, res, next) => {
  const { emailId, otp } = req.body;
  try {
    const tempUser = await TempUser.findOne({ email: emailId });

    if (!tempUser) {
      next(errorHandler(400, "User not found"));
    }

    if (tempUser.otp !== otp) {
      next(errorHandler(400, "Invalid OTP"));
    }

    const token = jwt.sign({ id: tempUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    if (otp === tempUser.otp) {
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        })
        .json({ message: "OTP verified successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const checkOtp = async (req, res, next) => {
  const { emailId, otp } = req.body;
  try {
    const user = await User.findOne({ email: emailId });

    if (!user) {
      next(errorHandler(400, "User not found"));
    }

    if (user.otp !== otp) {
      next(errorHandler(400, "Invalid OTP"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    if (otp === user.otp) {
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        })
        .json({ message: "OTP verified successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  if (
    !email ||
    !password ||
    !confirmPassword ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  if (password !== confirmPassword) {
    next(errorHandler(400, "Please enter the same password in both fields"));
  }

  try {
    await User.findOneAndUpdate(
      { email },
      {
        $set: { password: hashedPassword },
      }
    );

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res
      .status(200)
      .json(
        "Password update successfully. Please log in with your new credentials."
      );
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  signin,
  googleLogin,
  googleCallback,
  authEmail,
  checkAuth,
  forgotPassword,
  resetPassword,
  checkSignupOtp,
  checkOtp,
};
