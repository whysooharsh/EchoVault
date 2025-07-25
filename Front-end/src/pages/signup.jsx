import React, { useState } from "react";



function Signup() {
  return (
    <section className="min-h-screen w-full bg-[wheat] flex flex-col justify-center items-center selection:text-amber-600">
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex flex-col mb-6">
            <div>
              <h2 className="text-4xl text-black font-bold text-center">Login</h2>
            </div>
          </div>
          <form>
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">Username</label>
                <input type="username" placeholder="username" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">Password</label>
                <input type="password" placeholder="******" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-full">
                <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
