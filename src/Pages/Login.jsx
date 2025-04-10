import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {EmailContext} from "../Components/Context Api Store/EmailContext.jsx"

const Login = () => {
  const { setUserId ,setUsername,setEmail} = useContext(EmailContext);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("data:", data);

    try {
      const response  = await axios.post("http://localhost:3000/api/login",data)
      console.log(response)
      const token  = response.headers.authorization.split("Bearer ")[1]

      setUserId(response.data.userId);
      setUsername(response.data.username);
      setEmail(response.data.email)

      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId",response.data.userId)
      localStorage.setItem("email",  response.data.email);

      localStorage.setItem("Token", token)
      toast.success(response.data.message)
      navigate("/dashboard")
    } catch (error) {
      console.log("Error submitting form", error.message)
      // toast.error(response.data.message)
    }
    
};
return (
  <div className="bg-purple-50 w-full h-[90vh]  flex items-center justify-center relative">
    <img
      src="signupandlogin.avif"
      className="w-full h-full md:w-[1100px] md:h-[600px] object-cover shadow-2xl shadow-black rounded-[50px]"
      alt=""
    />
    <div className="absolute h-[400px] w-[400px] bg-white/10 left-[270px] rounded-4xl backdrop-blur-[10px] border border-white shadow-2xl shadow-black text-white p-3">
      <h2 className="text-[40px] text-center font-medium">Welcome Back</h2>
      <p className="text-center text-sm font-medium">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#a1ffc7]">
          Sign Up
        </Link>
      </p>

      <form
        className="flex flex-col gap-5 mt-5"
        onSubmit={handleSubmit(onSubmit)}
        
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
            type="email"
            name="email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
            type="password"
            name="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="text-right text-sm">
          <span className="text-[#03471e] font-medium cursor-pointer">
            Forgot Password?
          </span>
        </div>
        <input
          type="submit"
          className="bg-[#66e79a] shadow-lg text-[#1d3f2b] font-medium rounded cursor-pointer py-2"
          value="Login"
        />
      </form>
    </div>
  </div>
);
}

export default Login;
