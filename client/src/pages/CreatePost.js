import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const filePickerRef = useRef();
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [postContent, setPostContent] = useState("");

  const handleFileChange = (e) => {
    const tempFile = e.target.files[0];
    if (tempFile) {
      setFile(tempFile);
      setFileName(shortenFileName(tempFile.name));
    } else {
      setFileName("0 file chosen");
    }
  };

  const shortenFileName = (name) => {
    const maxLength = 20;
    if (name.length <= maxLength) {
      return name;
    }
    const firstPart = name.slice(0, 6);
    const lastPart = name.slice(-6);
    return `${firstPart}...${lastPart}`;
  };

  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Please select an image");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const uniqueFileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueFileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUploadProgress(null);
          setImageFileUploadError(null);
          setFormData({ ...formData, image: downloadURL });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleContentChange = (content) => {
    setPostContent(content);
    setFormData({ ...formData, content });
  };

  return (
    <div className="min-h-screen text-base text-center text-dark-charcoal font-roboto mx-auto max-w-sm sm:max-w-lg md:max-w-2xl xl:max-w-3xl">
      <h1 className="text-3xl font-semibold my-6">Create a post</h1>
      {imageFileUploadError && (
        <div className=" text-red-700 bg-red-100 mb-2 p-2 rounded-sm  font-medium text-center">
          <span>{imageFileUploadError}</span>
        </div>
      )}
      <form>
        <div className="flex flex-col sm:flex-row sm:gap-4 justify-between">
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Title"
            className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
          />
          <select
            name="label"
            id="label"
            className="w-full sm:w-80 p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
          >
            <option value="uncategorized">Select a catagory</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="mongodb">MongoDb</option>
            <option value="expressjs">Express.js</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
          </select>
        </div>
        <input
          type="file"
          accept="image/*"
          className="w-96"
          onChange={handleFileChange}
          ref={filePickerRef}
          hidden
        />
        <div className="flex gap-2 items-center justify-between py-2 mb-2">
          <div
            className="flex border border-slate-200 rounded"
            onClick={() => filePickerRef.current.click()}
          >
            <span className="text-white bg-gray-700 px-4 py-2 md:px-6 rounded-tl rounded-bl hover:shadow-custom-indigo hover:cursor-pointer">
              Choose file
            </span>
            <span className="text-start text-dark-charcoal bg-slate-100 px-4 py-2 sm:w-48 hover:cursor-pointer">
              {fileName || "No file chosen"}
            </span>
          </div>
          <button
            className="flex gap-2 items-center border-gray-700 hover:bg-gray-600 hover:text-white border rounded px-2 py-2 md:px-6 hover:shadow-custom-indigo"
            onClick={handleImageUpload}
            disabled={imageFileUploadProgress}
          >
            {imageFileUploadProgress ? (
              <div className="w-8 h-8">
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
            {imageFileUploadProgress && <span>Uploading...</span>}
          </button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="Upload"
            className="w-full h-min mb-4"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-14"
          value={postContent}
          onChange={handleContentChange}
          required
        />

        <button
          className="w-full font-semibold tracking-wide text-center text-midnight-indigo bg-neon-green border border-midnight-indigo rounded p-2"
          onClick={handleImageUpload}
        >
          Publish
        </button>
      </form>
    </div>
  );
}
