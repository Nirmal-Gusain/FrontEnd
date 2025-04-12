import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full bg-purple-50 shadow-lg relative z-50">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-24 xl:px-[209px] py-3">
        <h2 className="font-semibold text-3xl font-serif text-purple-500">
          Dev.O
        </h2>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-5 items-center">
          <nav>
            <ul className="flex gap-5 mr-10">
              {[
                { label: "Home", path: "/" },
                { label: "Blogs", path: "/blogs" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
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
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-[0_0_20px_5px_#ffcbf2] hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
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

      {/* Mobile Menu (Floating Dropdown) */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-purple-50 z-40 shadow-md flex flex-col items-center gap-4 px-4 pb-4 pt-4 md:hidden transition-all duration-300">
          <ul className="flex flex-col items-center gap-3">
            {[
              { label: "Home", path: "/" },
              { label: "Blogs", path: "/blogs" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="text-purple-600 font-medium text-base hover:underline"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {username ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white px-5 py-2 rounded-full shadow-md"
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-purple-500 px-5 py-2 rounded-full shadow-md"
              >
                SignUp
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-purple-500 px-5 py-2 rounded-full shadow-md"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
