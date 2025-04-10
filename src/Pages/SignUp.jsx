import React from "react";
import {Link, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast";


const SignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("data:",data);

    const response = await axios.post("http://localhost:3000/api/signup",data)
    try {
      console.log(response.data)
      toast.success(response.data.message)
      navigate("/login")
    } catch (error) {
        console.log("Error Submitting form :" , error)
        toast.error(response.data.message)
    }

  };
  return (
    <div className="bg-purple-50 w-full h-[90vh] flex items-center justify-center relative">
      <img
        src="ren-ran-bBiuSdck8tU-unsplash 1.jpg"
        className="w-full h-full md:w-[1100px] md:h-[600px]  object-cover shadow-2xl shadow-black rounded-[50px]"
        alt=""
      />
      <div className="absolute  w-[500px] bg-white/10 left-[270px] rounded-4xl backdrop-blur-[10px] border border-white shadow-2xl shadow-black text-white p-3">
        <h2 className="text-[40px] text-center font-medium">Get Started</h2>
        <p className="text-center text-sm font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-[#a1ffc7]">Log in</Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white bg-transparent"
              type="text"
              name="name"
              id="name"
            {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p role="alert" className=" text-red-600 absolute right-5">Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
              type="email"
              name="email"
              id="email"
            {...register("email", { required: true })}

            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-600 absolute right-5">Email is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
              type="phone"
              name="phone"
              id="phone"
            {...register("phone", { required: true })}

            />
            {errors.phone?.type === "required" && (
              <p role="alert" className="text-red-600 absolute right-5">Phone Number is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              className="border-b-2 text-[17px] py-1 outline-none text-emerald-100 border-b-white"
              type="password"
              name="password"
              id="password"
            {...register("password", { required: true })}
            
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-600 absolute right-5">Password is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium">
              {" "}
              Category
            </label>
            <select
              name="category"
              id="category"
              className="text-white border-white border px-5 py-2 rounded-lg "
            {...register("category", { required: true })}

            >
              <option className="bg-black" value="travel">
                Travel
              </option>
              <option className="bg-black" value="business">
                Business
              </option>
              <option className="bg-black" value="health">
                Health
              </option>
              <option className="bg-black" value="finance">
                Finance
              </option>
              <option className="bg-black" value="technology">
                Technology
              </option>
            </select>
          </div>
          <input
            type="submit"
            className="bg-[#66e79a] shadow-lg text-[#1d3f2b] font-medium rounded cursor-pointer py-2"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;


