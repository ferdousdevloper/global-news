import React from 'react';
import './SignInPage.css'; // Import custom CSS for shapes
import { Link } from 'react-router-dom';



const SignInPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden font-montserrat">
      
      {/* Sign In Container */}
      <div className="relative flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-[#02AA08]">
        
        {/* Left Side - Register */}
        <div className="w-1/2 bg-[#02AA08] p-8 flex flex-col justify-center items-center">
          <h2 className="text-white text-4xl font-bold">Welcome Back!</h2>
          <p className="text-white mt-4 text-lg">Don't have any account? Please register!!</p>
          <button className="mt-6 px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#02AA08] transition">
            <Link to="/register">Register</Link> 
          </button>
        </div>

        {/* Right Side - Sign In */}
        <div className="w-1/2 bg-gray-800 p-8 flex flex-col justify-center">
          <h2 className="text-[#02AA08] text-3xl font-bold mb-4">Sign in your account</h2>
          <p className="text-gray-400 mb-8">or use your email for sign in</p>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-400" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder='Email'
              className="w-full  px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02AA08]"
            />
          </div>
          
          
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-400" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder='*****'
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02AA08]"
            />
          </div>

          {/* Sign In Button */}
          <button className="w-full py-2 bg-[#02AA08] text-white rounded-md hover:bg-green-400 transition">
            SIGN IN
          </button>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="bg-rectangle"></div>
        <div className="bg-ellipse"></div>
        <div className="bg-polygon"></div>
        <div className="bg-circle-small"></div>
        <div className="bg-circle-large"></div>
        <div className="bg-triangle"></div>
        <div className="bg-diamond"></div>
        <div className="bg-parallelogram"></div>
        <div className="bg-oval"></div>
      </div>
    </div>
  );
};

export default SignInPage;
