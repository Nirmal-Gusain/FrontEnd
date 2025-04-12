import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const username = localStorage.getItem("username") || "Anonymous";

  // Fetch Blog and Comments
  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const response = await axios.get(`https://server-m4z2.onrender.com/api/singleblog/${id}`);
            setBlog(response.data);
            setComments(response.data.comments || []); // ✅ Ensure we use "comments"
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };
    fetchBlog();
}, [id]);


  // Submit Comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Comment cannot be empty");

    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("userId"); 

    try {
        const response = await axios.post(
            `https://server-m4z2.onrender.com/api/addcomments/${userId}/${id}`,
            { comment },
            {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            }
        );

        if (response.status === 201) {
            // ✅ Fetch latest comments after successful addition
            const updatedBlog = await axios.get(`https://server-m4z2.onrender.com/api/singleblog/${id}`);
            setComments(updatedBlog.data.comments); // ✅ Ensure it updates
            setComment(""); 
        }
    } catch (error) {
        console.error("Error posting comment:", error.response?.data?.message || error.message);
    }
};


  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-4xl font-bold text-gray-800 text-center">
        {blog.title}
      </h2>
      <p className="text-gray-500 text-center mt-2 text-lg">{blog.category}</p>

      {blog.blogImage && (
        <img
          src={blog.blogImage}
          alt={blog.title}
          className="w-full h-110 object-cover mt-6 rounded-lg shadow-md"
        />
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <div
          className="text-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md mt-4"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
        <button
          type="submit"
          className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Post Comment
        </button>
      </form>

      {/* Display Comments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Comments:</h3>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-lg mt-2 shadow-sm"
            >
              <p className="text-gray-700">{c.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                - {c.username ? c.username : "Anonymous"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* Go Back Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition shadow-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SingleBlog;
