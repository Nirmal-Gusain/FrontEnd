import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import CreateBlogs from "../Components/CreateBlogs";
import AllBlogs from "../Components/AllBlogs";
import DashboardPage from "../Components/DashboardPage";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(
          `https://server-m4z2.onrender.com/api/profilepic/${userId}`
        );
        console.log(response.data);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic();
  }, [userId]);

  const handleProfileClick = () =>{
    navigate("/upload")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-22"
        } min-h-full bg-emerald-600 text-white p-5 transition-all duration-300`}
      >
        <button
          className="text-2xl mb-5 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>

        <ul className="space-y-4">
          <li
            className={`p-3 rounded-lg hover:bg-emerald-700 transition ${
              activeComponent === "Dashboard"
                ? "bg-emerald-400"
                : "bg-emerald-800"
            }`}
            onClick={() => setActiveComponent("Dashboard")}
          >
            {isSidebarOpen ? "📈 Dashboard" : "📈"}
          </li>
          <li
            className={`p-3 rounded-lg hover:bg-emerald-700 transition ${
              activeComponent === "Create Blog"
                ? "bg-emerald-400"
                : "bg-emerald-800"
            }`}
            onClick={() => setActiveComponent("Create Blog")}
          >
            {isSidebarOpen ? "📌 Create Blog" : "📌"}
          </li>
          <li
            className={`p-3 rounded-lg hover:bg-emerald-700 transition ${
              activeComponent === "All Blogs"
                ? "bg-emerald-400"
                : "bg-emerald-800"
            }`}
            onClick={() => setActiveComponent("All Blogs")}
          >
            {isSidebarOpen ? "📄 All Posts" : "📄"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-emerald-600">Dev.O</h1>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-2">
              <li>
                <NavLink className="px-5 py-3 text-sm font-medium" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="px-5 py-3 text-sm font-medium" to="/blogs">
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink className="px-5 py-3 text-sm font-medium" to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="px-5 py-3 text-sm font-medium"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-3">
            <p className="text-lg font-medium">Welcome, {username}</p>
            <div onClick={handleProfileClick}>
              {profilePic ? (
                <img
                  src={profilePic}
                  className="w-12 h-12 rounded-full object-cover object-top cursor-pointer"
                  alt="Profile Picture"
                />
              ) : (
                <FaUserCircle className="text-3xl w-12 h-12 text-gray-600 cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          {userData && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-emerald-600">
                User Details
              </h2>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Created Blogs:</strong> {userData.createdBlogs.length}
              </p>
            </div>
          )}
          {activeComponent === "Create Blog" && <CreateBlogs />}
          {activeComponent === "All Blogs" && <AllBlogs />}
          {activeComponent === "Dashboard" && <DashboardPage />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
