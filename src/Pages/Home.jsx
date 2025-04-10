import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCode, FaPenFancy, FaChartLine } from "react-icons/fa";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://server-m4z2.onrender.com/api/getallblogs"
        );
        if (Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs.slice(0, 3)); // Show only first 3
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <header className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
          Discover Stories That Matter
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Dive into inspiring blogs, helpful tips, and powerful ideas. Share
          your voice with the world.
        </p>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition"
        >
          Start Reading
        </button>
      </header>

      {!loading && blogs.length > 0 && (
        <section className="px-6 py-12">
          <h3 className="text-3xl font-bold tracking-wider text-center text-purple-700 mb-10">
            Featured Blogs
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-0 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {blog.blogImage && (
                  <img
                    src={blog.blogImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                      {blog.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-purple-800 line-clamp-1">
                    {blog.title}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {blog.content.replace(/<[^>]+>/g, "").substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => navigate(`/readblog/${blog._id}`)}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gray-100 py-16 px-6">
        <h3 className="text-2xl font-semibold text-center text-purple-700 mb-10">
          Why Choose Dev.O?
        </h3>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              User-Friendly Interface
            </h4>
            <p className="text-sm text-gray-600">
              Navigate and publish blogs effortlessly with our intuitive UI
              built for speed and simplicity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              Lightning Fast Backend
            </h4>
            <p className="text-sm text-gray-600">
              Powered by Node.js and MongoDB, our app ensures quick blog loading
              and real-time updates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              Built for Writers & Readers
            </h4>
            <p className="text-sm text-gray-600">
              Whether you're here to blog or to read — we’ve got a seamless
              experience tailored just for you.
            </p>
          </div>
        </div>
      </section>

      {loading && (
        <section className="px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow animate-pulse space-y-4"
              >
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
                <div className="h-3 bg-gray-300 w-full rounded"></div>
                <div className="h-3 bg-gray-300 w-5/6 rounded"></div>
                <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quote Section */}
      <section className="bg-purple-500 text-white text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          “Words can inspire. And stories can change the world.”
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Every blog you read or write here has the power to spark ideas, make
          change, and build a better tomorrow.
        </p>
      </section>
    </>
  );
};

export default Home;
