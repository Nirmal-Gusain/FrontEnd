import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!data.name.trim()) return toast.error("Name is required");
    if (!data.email.trim()) return toast.error("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return toast.error("Invalid email format");

    if (!data.phone.trim()) return toast.error("Phone number is required");
    if (!/^\d{10}$/.test(data.phone)) return toast.error("Phone number must be exactly 10 digits");

    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6) return toast.error("Password must be at least 6 characters");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(data.password)) {
      return toast.error("Password must include uppercase, lowercase, number, and special character");
    }

    if (!data.category) return toast.error("Please select a category");

    try {
      const response = await axios.post("https://server-m4z2.onrender.com/api/signup", data);
      toast.success(response.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-xl bg-white/20 rounded-2xl backdrop-blur-[10px] border border-white shadow-2xl p-6 sm:p-8">
        <h2 className="text-3xl sm:text-3xl font-semibold text-center text-black">Get Started</h2>
        <p className="text-center text-sm font-normal text-black mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-[#a1ffc7] hover:underline">Log in</Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-black">Name</label>
            <input
              className="border-b-2 text-base py-1 outline-none text-black bg-transparent border-b-white"
              type="text"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-black">Email</label>
            <input
              className="border-b-2 text-base py-1 outline-none text-black bg-transparent border-b-white"
              type="email"
              id="email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-black">Phone Number</label>
            <input
              className="border-b-2 text-base py-1 outline-none text-black bg-transparent border-b-white"
              type="tel"
              id="phone"
              {...register("phone")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-black">Password</label>
            <input
              className="border-b-2 text-base py-1 outline-none text-black bg-transparent border-b-white"
              type="password"
              id="password"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium text-black">Category</label>
            <select
              id="category"
              className="text-white border border-white px-4 py-2 rounded-lg bg-transparent"
              {...register("category")}
            >
              <option className="bg-black" value="">Select Category</option>
              <option className="bg-black" value="travel">Travel</option>
              <option className="bg-black" value="business">Business</option>
              <option className="bg-black" value="health">Health</option>
              <option className="bg-black" value="finance">Finance</option>
              <option className="bg-black" value="technology">Technology</option>
            </select>
          </div>
          <input
            type="submit"
            className="bg-[#66e79a] shadow-lg text-[#1d3f2b] font-medium rounded cursor-pointer py-2 hover:bg-[#57d68b] transition"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
