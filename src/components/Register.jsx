import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState("");
    const {registerUser} = useAuth()
    const navigate = useNavigate()
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
      try {
        await registerUser(data.email, data.password)
        alert("User registered successfully")
        navigate("/")
      } catch (error) {
        setMessage("Wrong sign up details")
        console.log(error)
        
      }
    };
  
    const handleGoogleSignIn = () => {
      
    }
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
    <div className="w-full max-w-sm shadow-md px-8 pt-6 pb-8 mb-4 mx-auto bg-white">
      <h3 className="font-semibold text-xl mb-4">Please Register</h3>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="text-sm font-bold mb-2 text-gray-700 block"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="shadow appearance-none leading-tight border focus:outline-none focus:shadow w-full rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            className="text-sm font-bold mb-2 text-gray-700 block"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="shadow appearance-none leading-tight border focus:outline-none focus:shadow w-full rounded px-3 py-2"
          />
        </div>
        {message && (
          <p className="text-red-500 text-xs mb-3 italic">{message}</p>
        )}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 px-8 py-2 text-white 
                  font-bold focus:outline-none rounded"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-4 align-baseline text-sm font-medium">
         have an account. Please{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </p>
      <div className="mt-4">
        <button 
        onClick={handleGoogleSignIn}
        className="flex flex-wrap items-center justify-center w-full bg-secondary hover:bg-blue-700 focus:outline-none py-1 text-white rounded ">
          <FaGoogle className="mr-2" />
          sign in with Google
        </button>
      </div>
      <p className="text-gray-500 text-xs text-center mt-4">
        2025 book store. All rights reserved
      </p>
    </div>
  </div>
  )
}

export default Register