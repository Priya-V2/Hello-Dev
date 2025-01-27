import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsExclamationCircle } from "react-icons/bs";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "code-block"],
];

const modules = {
  toolbar: toolbarOptions,
};

export default function UpdatePost() {
  const filePickerRef = useRef();
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    image: "",
    content: "",
    slug: "",
  });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [predefinedTags, setPredefinedTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const replacePreTagsWithCode = (content) => {
    return content
      .replace(
        /<pre class="ql-syntax" spellcheck="false">/g,
        "<pre spellcheck='false'><code>"
      )
      .replace(/<\/pre>/g, "</code></pre>");
  };

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/get-posts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
        } else {
          setPublishError(null);
          setFormData(data.posts[0]);
          setTags(() => [...data.posts[0].tags]);
        }
      };

      fetchPost();
    } catch (error) {
      setError(error);
    }
  }, [postId]);

  useEffect(() => {
    try {
      const getPredefinedTags = async () => {
        try {
          const res = await fetch("/api/settings/get-setting");
          const data = await res.json();

          if (!res.ok) {
            setError(data.message);
          }

          setPredefinedTags(data.predefinedTags);
        } catch (error) {
          setError(error.message);
        }
      };

      getPredefinedTags();
    } catch (error) {
      setError(error);
    }
  }, []);

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
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedContent = replacePreTagsWithCode(formData.content);

    try {
      const res = await fetch(
        `/api/post/update-post/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            content: formattedContent,
            tags,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Some thing went wrong");
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();

    const trimmedTag = tag.trim().toLowerCase();

    if (!trimmedTag) {
      alert("Please enter a tag name");
    }

    if (!predefinedTags.includes(trimmedTag)) {
      alert(`Invalid tag! Please enter a valid tag from the following tags:
${predefinedTags.join(", ")}`);
    } else {
      setTags((prevState) => [...prevState, trimmedTag]);
      setTag("");
    }
  };

  const handleAddTagToDatabase = async () => {
    const trimmedTag = tag.trim().toLowerCase();

    if (!trimmedTag) {
      setError("Please enter a tag name");
    }

    try {
      const res = await fetch(
        `/api/settings/update-setting/${currentUser._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag: trimmedTag }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      }

      setPredefinedTags(data.predefinedTags);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prevState) =>
      prevState.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="min-h-screen text-base text-center text-dark-charcoal font-roboto mx-auto max-w-sm sm:max-w-lg md:max-w-2xl xl:max-w-3xl">
      <h1 className="text-3xl font-semibold my-6">Update post</h1>
      {imageFileUploadError && (
        <div className="text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
          <span>{imageFileUploadError}</span>
        </div>
      )}
      {error && (
        <div className="text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
          <span>{error}</span>
        </div>
      )}
      {publishError && (
        <div className="text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
          <span>{publishError}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row sm:flex-row sm:gap-4 justify-between">
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Title"
            className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={(e) => {
              const modifiedTitle = e.target.value;
              const modifiedSlug = modifiedTitle
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]/g, "")
                .trim()
                .split(/\s+/)
                .join("-");
              setFormData({
                ...formData,
                title: e.target.value,
                slug: modifiedSlug,
              });
            }}
            value={formData.title}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-base sm:text-xs lg:text-sm">
          <select
            name="label"
            id="label"
            className="w-full sm:w-80 p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
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

          <input
            type="tag"
            id="tag"
            name="tag"
            placeholder="Add tags here"
            className="w-full sm:w-min p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <button
            type="button"
            className="w-full sm:w-32 p-2 mt-1 mb-2 border-2 bg-gray-200 rounded hover:bg-gray-500 hover:text-white hover:border-gray-500"
            onClick={handleAddTag}
          >
            Add tag
          </button>

          <button
            type="button"
            className="w-full sm:w-52 p-2 mt-1 mb-2 border-2 bg-gray-200 rounded hover:bg-gray-500 hover:text-white hover:border-gray-500"
            onClick={() => setShowModal(true)}
          >
            Add new tag to DB
          </button>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-4 max-w-6xl my-6">
            {tags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between gap-6 px-4 py-1 border border-gray-600 rounded-full"
                >
                  <p>{tag}</p>
                  <button type="button" onClick={() => removeTag(index)}>
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        )}

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
            className="max-w-1/2 h-min mb-4"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-14"
          modules={modules}
          onChange={(value) => setFormData({ ...formData, content: value })}
          required
          value={formData.content}
        />

        <button
          type="submit"
          className="w-full font-semibold tracking-wide text-center text-midnight-indigo bg-neon-green border border-midnight-indigo rounded p-2"
        >
          Update post
        </button>
      </form>

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
              Are you sure you want add{" "}
              <strong className="text-grey-">"{tag}"</strong>
              to the database?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="text-white text-sm bg-red-600 px-4 py-2 rounded-md"
                onClick={() => {
                  handleAddTagToDatabase();
                  setShowModal(false);
                }}
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
