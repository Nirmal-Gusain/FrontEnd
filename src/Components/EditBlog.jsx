import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);


  const [formData, setFormData] = useState({
    title: "",
    category: "travel",
  });

  const [content, setContent] = useState("");
  const [blogImg, setBlogImg] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/singleblog/${id}`);
        const blogData = response.data;

        setFormData({
          title: blogData.title || "",
          category: blogData.category || "travel",
        });

        setContent(blogData.content || "");
        setPreview(blogData.blogImage); 
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

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

    const Data = new FormData();
    if (blogImg) Data.append("file", blogImg);
    Data.append("title", formData.title);
    Data.append("category", formData.category);
    Data.append("content", content);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/updateblog/${id}`,
        Data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Blog Updated Successfully!");
        navigate("/dashboard");
      } 
    } catch (error) {
      console.error("Error updating blog:", error);  
      toast.error("Failed to update blog.");
    }
  };

  return (
    <div className="flex flex-col gap-y-5 px-40 pt-10 bg-emerald-100">
      <h2 className="text-3xl font-medium">Edit Blog</h2>
      <div className="flex items-end justify-between">
        <div className="w-1/3 flex flex-col">
          <label htmlFor="title" className="text-lg mb-1">Blog Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-2 py-2 rounded outline-none"
          />
        </div>
        <button
          className="bg-[#009966] text-white px-10 py-2 text-lg rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>

      <div className="flex flex-col w-1/4">
        <label htmlFor="category" className="text-lg mb-1">Blog Category</label>
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
        <label className="text-lg font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
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

export default EditBlog;
