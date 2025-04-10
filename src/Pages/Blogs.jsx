import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const categoryIcons = {
  All: "📰",
  Technology: "💻",
  Business: "💼",
  Design: "🎨",
  Health: "💊",
  Travel: "✈️",
  Food: "🍕",
  Education: "📚",
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://server-m4z2.onrender.com/api/getallblogs");
        if (Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
          setFilteredBlogs(response.data.blogs);

          const uniqueCategories = [
            "All",
            ...new Set(response.data.blogs.map((blog) => blog.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          setBlogs([]);
          setFilteredBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category === category));
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen">
      <section className="py-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-600">Resources and Insights</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </section>

      {/* Categories */}
      <div className="flex justify-center flex-wrap gap-3 px-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterByCategory(category)}
            className={`px-5 py-2 rounded-full border transition-all font-medium text-sm flex items-center gap-2 ${
              activeCategory === category
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white border-gray-300 text-gray-800 hover:bg-purple-100"
            }`}
          >
            <span>{categoryIcons[category] || "🗂️"}</span>
            {category}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <ImSpinner2 className="text-purple-600 animate-spin text-4xl" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-lg font-medium text-gray-600 mt-10">No blogs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-3xl hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
              >
                {blog.blogImage && (
                  <img
                    src={blog.blogImage}
                    alt={blog.title}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                )}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                      {blog.category}
                    </span>
                    <p className="text-gray-500 flex items-center gap-1 text-xs sm:text-sm">
                      <FaRegCommentDots size={16} /> {blog.comments.length}
                    </p>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                    {blog.title}
                  </h3>

                  <div
                    className="text-gray-600 text-sm line-clamp-2 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.substring(0, 100) + "...",
                    }}
                  />

                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/readblog/${blog._id}`)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition w-full"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
