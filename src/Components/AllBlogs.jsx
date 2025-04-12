import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";

const AllBlogs = () => {
  const userId = localStorage.getItem("userId");
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getuserdata/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.existingUser.createdBlogs);
        setBlogData(response.data.existingUser.createdBlogs);
        // console.log(blogData)
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogData();
  }, []);

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `https://server-m4z2.onrender.com/api/deleteblog/${blogId}`
      );

      if (response.status === 200) {
        toast.success("Blog deleted successfully!");
        setBlogData(blogData.filter((blog) => blog._id !== blogId));
      }
    } catch (error) {
      toast.error("Failed to delete the blog.");
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-3xl font-medium mb-6">All Blogs</h1>
      <div className="flex flex-wrap gap-6 p-8 bg-[#0b1120] rounded-2xl text-white">
        {blogData.length > 0 ? (
          [...blogData] 
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
            .map((post) => (
              <div
                key={post._id}
                className="bg-[#1a2332] w-[330px] rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.blogImage}
                  className="w-full h-60 object-cover"
                  alt="blog img"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {post.category || "Uncategorized"}
                    </p>
                    <p className="text-gray-600 mt-2 flex items-center gap-1 font-medium">
                      <FaRegCommentDots size={20} /> {post.comments.length}
                    </p>
                  </div>
                  <div
                    className="text-gray-600 mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: post.content.substring(0, 100) + "...",
                    }}
                  />
                  <button
                    className="text-sm text-blue-500 cursor-pointer mt-2"
                    onClick={() => navigate(`/readblog/${post._id}`)}
                  >
                    Read more
                  </button>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={() => navigate(`/editblog/${post._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(post._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-400">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
