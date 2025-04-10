import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
    } catch (error) {
      console.log("Login error:", error);
      toast.error(error?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="bg-purple-50 w-full min-h-screen flex items-center justify-center relative">
      <img
        src="/signupandlogin.avif"
        className="w-full h-full md:w-[1100px] md:h-[600px] object-cover shadow-xl rounded-[40px]"
        alt="Login Background"
      />

      <div className="absolute w-[90%] max-w-md bg-white/10 backdrop-blur-md rounded-[25px] border border-white p-6 text-white shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-1">Welcome Back</h2>
        <p className="text-sm text-center mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#a1ffc7] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="border-b-2 bg-transparent text-[17px] py-1 outline-none text-emerald-100 border-white focus:border-emerald-300"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-200 text-xs">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="border-b-2 bg-transparent text-[17px] py-1 outline-none text-emerald-100 border-white focus:border-emerald-300"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-200 text-xs">{errors.password.message}</span>}
          </div>

          <div className="text-right text-sm">
          <p className="text-sm text-right">
  <Link to="/resetpassword" className="text-[#a1ffc7]">Forgot Password?</Link>
</p>
          </div>

          <button
            type="submit"
            className="bg-[#66e79a] text-[#1d3f2b] font-semibold rounded py-2 hover:bg-[#4ed28a] transition shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
