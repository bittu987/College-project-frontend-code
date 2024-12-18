import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import img from "../assests/loginphoto.svg"


const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.loginid && data.password) {
      const headers = {
        "Content-Type": "application/json",
      };

      
      
      
      const apiUrl = `${process.env.REACT_APP_APILINK}/${selected}/auth/login`;
   
      

      axios
        .post(apiUrl, data, { headers })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response?.data?.message || "An unexpected error occurred.");
        });
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col lg:flex-row justify-between items-center">
    {/* Image section (hidden on small screens) */}
    <img
      className="hidden lg:block w-[60%] h-[100vh] object-cover"
      src={img}
      alt="Image"
    />
  
    {/* Content Section */}
    <div className="w-full lg:w-[40%] flex justify-center items-start flex-col px-6 lg:pl-8">
      <p className="text-2xl lg:text-3xl font-semibold pb-2 border-b-2 border-green-500">
        {selected} Login
      </p>
      <form
        className="flex justify-center items-start flex-col w-full mt-6 lg:mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full lg:w-[70%]">
          <label className="mb-1" htmlFor="eno">
            {selected} Login ID
          </label>
          <input
            type="text"
            id="eno"
            required
            className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
            {...register("loginid")}
          />
        </div>
        <div className="flex flex-col w-full lg:w-[70%] mt-3">
          <label className="mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
            {...register("password")}
          />
        </div>
        <button className="bg-black mt-5 text-white px-6 py-2 text-lg lg:text-xl rounded-md hover:bg-green-700 transition-all flex justify-center items-center">
          Login
          <span className="ml-2">
            <FiLogIn />
          </span>
        </button>
      </form>
    </div>
  
    {/* Role Selection Buttons */}
    <div className="absolute top-4 right-4">
      {["Student", "Faculty", "Admin"].map((role) => (
        <button
          key={role}
          className={`text-black mr-4 lg:mr-6 text-sm lg:text-base font-semibold hover:text-black transition-all ${
            selected === role && "border-b-2 border-red-400"
          }`}
          onClick={() => setSelected(role)}
        >
          {role}
        </button>
      ))}
    </div>
  
    {/* Notification Toaster */}
    <Toaster position="bottom-center" />
  </div>
  
  );
};

export default Login;
