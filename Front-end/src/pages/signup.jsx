import React, { useState } from "react";

function Signup () {
  return (
    <div className="min-h-screen w-full bg-[wheat] flex flex-col pt-16 selection:text-amber-600">
      <div className="max-w-md mx-auto w-full p-6 my-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center">Join echo.vault</h1>
            <p className="text-center text-neutral-500 p-2">Start by creating your time capsules today.</p>
            <form>
                <div>
                  <label>
                  </label>
                  <input 
                    type = "text"
                    id = "name"
                    name="name"
                    className=""
                    required
                    />
                </div>
            </form>
          </div>
      </div>
    </div>
  );
}

export default Signup;
