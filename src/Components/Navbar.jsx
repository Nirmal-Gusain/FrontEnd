import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsername(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between px-[209px] py-3 items-center w-full bg-purple-50 shadow-lg">
      <h2 className="font-semibold text-3xl font-serif text-purple-500">
        Dev.O
      </h2>

      <div className="flex gap-5 items-center">
        <nav>
          <ul className="flex gap-5 mr-10">
            {[
              { label: "Home", path: "/" },
              // { label: "About", path: "/about" },
              { label: "Blog", path: "/blogs" },
              // { label: "Contact", path: "/contact" },
            ].map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition text-purple-600 hover:text-purple-800
            before:content-[''] before:absolute before:bottom-0 before:left-0 
            before:w-0 before:h-[2px] before:bg-purple-600 
            before:transition-all before:duration-300
            hover:before:w-full
            ${isActive ? "before:w-full" : "before:w-0"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {username ? (
          <>
            <NavLink
              to="/dashboard"
              className="relative z-10 px-6 py-2.5 text-white font-semibold rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 shadow-md hover:shadow-[0_0_20px_5px_#ffcbf2] hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Dashboard
            </NavLink>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-5 py-2 font-medium rounded-full transition ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white"
                    : "bg-white text-purple-500 hover:bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-[0_0_20px_5px_#ffcbf2] hover:scale-105"
                }`
              }
            >
              SignUp
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-5 py-2 font-medium rounded-full transition ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white"
                    : "bg-white text-purple-500 hover:bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-[0_0_20px_5px_#ffcbf2] hover:scale-105"
                }`
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
