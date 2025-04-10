import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
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
    <div className="bg-purple-50">
      {/* Hero Section */}
      <section className="py-8 text-center">
        <h1 className="text-5xl font-bold mt-2 text-purple-600">Resources and insights</h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </section>

      {/* Categories */}
      <div className="flex justify-center flex-wrap gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterByCategory(category)}
            className={`px-5 py-2 rounded-full border transition-all font-medium text-sm ${
              activeCategory === category
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white border-gray-300 text-gray-800 hover:bg-purple-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-lg font-medium text-gray-600 mt-10">No blogs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                {blog.blogImage && (
                  <img
                    src={blog.blogImage}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                      {blog.category}
                    </span>
                    <p className="text-gray-500 flex items-center gap-1 text-sm">
                      <FaRegCommentDots size={16} /> {blog.comments.length}
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1 text-gray-800">
                    {blog.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.substring(0, 100) + "...",
                    }}
                  />

                  <button
                    onClick={() => navigate(`/readblog/${blog._id}`)}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Read More
                  </button>
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
