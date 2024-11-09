import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserSuccess,
} from "../redux/user/userSlice.js";
import { Link } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function DashProfile() {
  const { currentUser, loading } = useSelector((store) => store.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const ctaChanges =
    loading || imageFileUploading
      ? "bg-neon-green-tint cursor-not-allowed"
      : "bg-neon-green";
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
          setImageFileUploadProgress(null);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(null);
    setUpdateError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateError("Please wait for image to upload");
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        setUpdateError(data.message);
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess("User's profile updated successfully");
        setFormData({ ...formData, password: "" });
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        setUpdateError(data.message);
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutUserSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-roboto text-base text-dark-charcoal max-w-sm mx-auto w-full">
      <h1 className="font-medium text-2xl text-center mt-6 mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-24 h-24  mb-6 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          {imageFileUrl || currentUser.profilePicture ? (
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="User's profile"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          ) : (
            <FaUserCircle className="rounded-full w-full h-full object-cover" />
          )}
        </div>

        {imageFileUploadError && (
          <div className=" text-red-700 bg-red-100 mb-2 p-2 rounded-sm  font-medium text-center">
            <span>{imageFileUploadError}</span>
          </div>
        )}
        {updateError && (
          <div className=" text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
            <span>{updateError}</span>
          </div>
        )}
        {updateSuccess && (
          <div className=" text-green-800 bg-green-100 mb-2 p-2 rounded-sm font-medium text-center">
            <span>{updateSuccess}</span>
          </div>
        )}
        <input
          type="text"
          id="username"
          name="username"
          className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          disabled
          className="w-full p-2 mt-1 mb-2 border-2 rounded cursor-not-allowed bg-neutral-200"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Reset Password"
          className="w-full p-2 mt-1 mb-5 border-2 rounded focus:outline-none focus:border-cool-blue"
          onChange={handleChange}
          value={formData.password || ""}
        />
        <button
          type="submit"
          className={`font-medium text-midnight-indigo ${ctaChanges} w-full p-1.5 mb-3 border border-midnight-indigo hover:shadow-custom-indigo rounded cursor-pointer`}
          disabled={imageFileUploading || loading}
        >
          Update
        </button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <button
              type="button"
              className="flex gap-1 justify-center font-medium text-dark-charcoal w-full p-1.5 mb-4 border border-midnight-indigo hover:shadow-custom-indigo rounded"
            >
              Create a post
            </button>
          </Link>
        )}
      </form>
      <div className="flex justify-between text-fail-red">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign out
        </span>
      </div>
      {showModal && (
        <div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 text-base text-center bg-white px-6 py-8 rounded-md shadow-lg z-10 ">
            <button
              className="absolute top-2 right-4 text-3xl text-gray-800 cursor-pointer bg-none"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <BsExclamationCircle className="text-gray-500 w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-4 sm:mb-6" />
            <span className="text-base sm:text-lg text-gray-500 w-4">
              Are you sure you want to delete your account?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="text-white text-sm bg-red-600 px-4 py-2 rounded-md"
                onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </button>
              <button
                className="text-sm border px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-sm z-5"></div>
        </div>
      )}
    </div>
  );
}
