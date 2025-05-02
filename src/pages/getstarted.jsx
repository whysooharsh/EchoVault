import React from "react";
import { useNavigate } from "react-router-dom";

function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[wheat] flex justify-center pt-16 selection:text-amber-600">
      <div className="md:p-10 p-8 mx-auto flex flex-col items-center">
        <h1 className="md:text-5xl text-4xl py-8">How It Works</h1>

        {/* Steps */}
        <div className="space-y-16 w-full">

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 p-4 pt-8">
            <div className="h-[10rem] w-[10rem] rounded-full bg-amber-100 text-5xl text-amber-900 items-center justify-center font-semibold grid">
              1
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-2xl pb-2 mb-4">Create your Account</h2>
              <p className="text-gray-600 text-lg mb-4">
                Sign up for echo.vault in seconds. All you need is an email<br />
                address and a password.
              </p>
              <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-neutral-800 transition cursor-pointer">
                Sign up now
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-4">
            <div className="h-[10rem] w-[10rem] rounded-full bg-blue-100 text-5xl text-amber-900 items-center justify-center font-semibold grid">
              2
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-2xl pb-2 mb-4">Write Your Time Capsule</h2>
              <p className="text-gray-600 text-lg mb-4">
                Write a message to your future self. Share your current goals, thoughts, or<br />
                anything else you want your future self to remember.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 p-4">
            <div className="h-[10rem] w-[10rem] rounded-full bg-amber-100 text-5xl text-amber-900 items-center justify-center font-semibold grid">
              3
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-2xl pb-2 mb-4">Set The Time Lock</h2>
              <p className="text-gray-600 text-lg mb-4">
                Choose when to unlock your message. It can be months or years from now—<br />
                the choice is yours.
              </p>
            </div>
          </div>

          {/* Step 4  */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 p-4">
            <div className="h-[10rem] w-[10rem] rounded-full bg-blue-100 text-5xl text-amber-900 items-center justify-center font-semibold grid">
              4
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-2xl pb-2 mb-4">Reflect to Your Past Self</h2>
              <p className="text-gray-600 text-lg mb-4">
                When the time comes, our AI will analyze your message and send you<br />
                thoughtful reflections, insights about how you've grown, and more.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GetStarted;
