import axios from "axios";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UploadDP = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await axios.post(
        `https://server-m4z2.onrender.com/api/upload/${id}`,
        formData
      );
      console.log(response.data.message);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700">
      <div className="flex flex-col items-center gap-6 p-12 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg w-96">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />
        ) : (
          <FaUserCircle className="w-32 h-32 text-gray-600 cursor-pointer" />
        )}
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleInput}
          className="file:px-6 file:py-3 file:border-0 file:rounded-xl file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600 file:transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-teal-600 transition-all"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin w-5 h-5 border-4 border-t-4 border-white rounded-full mr-2" />
              Uploading...
            </div>
          ) : (
            "Upload"
          )}
        </button>
        <button
          onClick={handleBackToDashboard}
          className="mt-4 px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UploadDP;
