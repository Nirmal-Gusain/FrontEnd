import axios from "axios";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UploadDP = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [loading,setLoading] = useState(false)

  const handleInput = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const id = localStorage.getItem("userId");

    try {
      setLoading(true)
      const response = await axios.post(
        `http://localhost:3000/api/upload/${id}`,
        formData
      );
      console.log(response.data.message);
      setLoading(false)
      navigate("/dashboard");
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex flex-col items-center gap-4 p-10 bg-gray-100/50 backdrop-blur-3xl rounded-lg shadow-md w-80">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-30 h-30 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-30 h-30 text-gray-600 cursor-pointer" />
        )}
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleInput}
          className="file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-blue-600 file:text-white file:cursor-pointer file:hover:bg-blue-700 file:transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled = {loading}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
        >
         {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadDP;
