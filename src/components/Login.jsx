import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.loginid && data.password) {
      const headers = {
        "Content-Type": "application/json",
      };

      
      // console.log("Selected role:", selected);
      
      const apiUrl = `${process.env.REACT_APP_APILINK}/${selected}/auth/login`;
      // const apiUrl = "http://localhost:5000/api/admin/auth/login"
      
      // console.log("API URL:", apiUrl); 

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
    <div className="bg-white h-[100vh] w-full flex justify-between items-center">
      <img
        className="w-[60%] h-[100vh] object-cover"
        src="	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKynVBunMRhZAvT9RK2mVbWl8eKLgUtzyfdQ&s"
        alt="Image"
      />
      <div className="w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
          {selected} Login
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[70%]">
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
          <div className="flex flex-col w-[70%] mt-3">
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
          <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4">
        {["Student", "Faculty", "Admin"].map((role) => (
          <button
            key={role}
            className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 transition-all ${
              selected === role && "border-b-2 border-green-500"
            }`}
            onClick={() => setSelected(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
