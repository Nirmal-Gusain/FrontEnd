import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special char, and be at least 6 characters"
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/reset-password", {
        email,
        password,
      });
      toast.success(res.data.message);
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="bg-purple-50 w-full h-[90vh] flex items-center justify-center relative">
      <img
        src="ren-ran-bBiuSdck8tU-unsplash 1.jpg"
        className="w-full h-full md:w-[1100px] md:h-[600px] object-cover shadow-2xl shadow-black rounded-[50px]"
        alt=""
      />
      <div className="absolute w-[500px] bg-white/10 left-[270px] rounded-4xl backdrop-blur-[10px] border border-white shadow-2xl shadow-black text-white p-6">
        <h2 className="text-[32px] text-center font-medium mb-2">Reset Password</h2>
        <p className="text-center text-sm font-medium text-emerald-100 mb-5">
          Enter your registered email and new password
        </p>

        <form onSubmit={handleReset} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white bg-transparent"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">
              New Password
            </label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white bg-transparent"
              type="password"
              name="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-[#66e79a] shadow-lg text-[#1d3f2b] font-medium rounded cursor-pointer py-2"
            value="Reset Password"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
