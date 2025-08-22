import React from 'react'

export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#fff] overflow-hidden">
      {/* Main Card */}
      <div className="bg-white absolute top-32 shadow-xl rounded-2xl w-full max-w-4xl flex z-10">
        {/* Left Section */}
        <div className="w-1/2 p-10 flex items-center justify-center">
          <img
            src="https://nmtdevserver.com/hammade/loginimg.png"
            alt="Login Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10">
          <div className="flex flex-col items-start justify-center h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 border-l-4 border-[#1F252C] pl-2">
              Login as a Admin
            </h2>

            <input
              type="email"
              placeholder="john.doe@xyz.com"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F252C]"
            />
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F252C]"
            />
            <button className="w-full py-3 rounded-full bg-[#1F252C] text-white font-semibold hover:bg-[#353c44] transition">
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 ">
         <img src="https://nmtdevserver.com/hammade/banner-img.png" alt="" />
      </div>
    </div>
  )
}
