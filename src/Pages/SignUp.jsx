import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    // Manual validations
    if (!data.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!data.email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!data.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    if (!/^\d{10}$/.test(data.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (!data.password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(data.password)) {
      toast.error("Password must include uppercase, lowercase, number, and special character");
      return;
    }

    if (!data.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/signup", data);
      toast.success(response.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-purple-50 w-full h-[90vh] flex items-center justify-center relative">
      <img
        src="ren-ran-bBiuSdck8tU-unsplash 1.jpg"
        className="w-full h-full md:w-[1100px] md:h-[600px] object-cover shadow-2xl shadow-black rounded-[50px]"
        alt=""
      />
      <div className="absolute w-[500px] bg-white/10 left-[270px] rounded-4xl backdrop-blur-[10px] border border-white shadow-2xl shadow-black text-white p-3">
        <h2 className="text-[40px] text-center font-medium">Get Started</h2>
        <p className="text-center text-sm font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-[#a1ffc7]">Log in</Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white bg-transparent"
              type="text"
              id="name"
              placeholder=""
              {...register("name")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
              type="email"
              id="email"
              placeholder=""
              {...register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
              type="tel"
              id="phone"
              placeholder=""
              {...register("phone")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
              type="password"
              id="password"
              placeholder=""
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select
              id="category"
              className="text-white border-white border px-5 py-2 rounded-lg bg-transparent"
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
            className="bg-[#66e79a] shadow-lg text-[#1d3f2b] font-medium rounded cursor-pointer py-2"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
