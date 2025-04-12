import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { EmailContext } from "../Components/Context Api Store/EmailContext.jsx";

const Login = () => {
  const { setUserId, setUsername, setEmail } = useContext(EmailContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("https://server-m4z2.onrender.com/api/login", data);
      const token = response.headers.authorization?.split("Bearer ")[1];

      if (!token) {
        toast.error("Authentication failed");
        return;
      }

      setUserId(response.data.userId);
      setUsername(response.data.username);
      setEmail(response.data.email);

      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("Token", token);

      toast.success(response.data.message || "Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-3xl border border-white rounded-3xl p-8 shadow-2xl shadow-black">
        <h2 className="text-3xl font-normal text-center text-black mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#a1ffc7] font-bold">Sign up</Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full bg-transparent border-b-2 border-black text-black  py-2 outline-none placeholder:text-gray-300 focus:border-emerald-300"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Password</label>
            <input
              id="password"
              type="password"
              className="w-full bg-transparent border-b-2 border-blacktext-black py-2 outline-none placeholder:text-gray-300 focus:border-emerald-300"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="text-right text-sm">
            <Link to="/resetpassword" className="text-black font-bold">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-300 text-[#1d3f2b] font-semibold rounded-lg py-2 hover:bg-emerald-400 transition shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
