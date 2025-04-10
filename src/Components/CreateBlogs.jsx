import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

const CreateBlogs = () => {
  const [blogImg, setBlogImg] = useState();
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "travel"
  });
  const userId = localStorage.getItem("userId");
  const editor = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInput = (e) => {
    const selectedFile = e.target.files[0];
    setBlogImg(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const Data = new FormData();
    Data.append("file", blogImg);
    Data.append("title", formData.title);
    Data.append("category", formData.category);
    Data.append("content", content);

    try {
      const imgResponse = await axios.post(
        `https://server-m4z2.onrender.com/api/uploadblogimg/${userId}`,
        Data
      );
      console.log(imgResponse.data.message);
    } catch (error) {}

    try {
      const response = await axios.post(
        `https://server-m4z2.onrender.com/api/createblog/${userId}`,
        Data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Blog creation response:", response.data);

      if (response.status === 201) {
        toast.success("Blog Added Successfully!");

        setFormData({
          title: "",
          category: "travel",
        });
        setContent(""); // ✅ clear content
        setBlogImg();
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog.");
    } finally {
      setIsUploading(false); // ✅ reset uploading status
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="text-3xl font-medium">Create Blog</h2>
      <div className="flex items-end justify-between">
        <div className="w-1/3 flex flex-col">
          <label htmlFor="title" className="text-lg mb-1">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-2 py-2 rounded outline-none"
          />
        </div>
        <button
          className="bg-[#009966] text-white px-10 py-2 text-lg rounded cursor-pointer"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Create"} {/* ✅ change button text */}
        </button>
      </div>

      <div className="flex flex-col w-1/4">
        <label htmlFor="category" className="text-lg mb-1">
          Blog Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="text-black border-black border px-3 py-2 rounded"
        >
          <option value="travel">Travel</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="finance">Finance</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-lg font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleInput}
          className="file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-blue-600 file:text-white file:cursor-pointer file:hover:bg-blue-700 transition-all"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-70 h-50 object-cover rounded-lg border border-gray-300"
          />
        )}
      </div>

      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default CreateBlogs;
