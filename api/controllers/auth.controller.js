import bcryptjs from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return next(errorHandler(409, "Existing email"));
  }

  const randomSuffix = Math.random().toString(36).substring(2, 5);
  const finalUserName = username + randomSuffix;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: finalUserName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("New user created sucessfully");
  } catch (error) {
    // res.status(500).json({ message: error.message });
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
        expiresIn: "2d",
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
        expiresIn: "2d",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://hello-dev.onrender.com/auth/google/callback"
        : "http://localhost:3000/auth/google/Callback"
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

export { signup, signin, googleLogin, googleCallback, checkAuth };
