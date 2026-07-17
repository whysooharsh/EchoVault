import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedTimeCapsuleAnimation from "../components/EchoHomeAnimation";

function Homepage() {
  const navigate = useNavigate();
  const handleClick1 = () => navigate("/signup");
  const handleClick2 = () => navigate("/login");

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col md:flex-row pt-16 selection:text-magical-gold selection:bg-vintage-ink/20">
      <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold max-w-xl mx-auto text-vintage-ink drop-shadow-sm leading-tight">
          Where the past echoes, future listens
        </h1>
        <p className="max-w-md mx-auto text-center my-6 text-lg text-vintage-ink/80 font-serif italic">
          Write to your future self, seal it with time, and let the magical vault bring your past
          back with insights and challenges...
        </p>

        <div className="flex gap-6 mt-6">
          <button
            onClick={handleClick1}
            className="px-6 py-3 rounded-md text-lg font-serif font-medium w-32 transition-all duration-300 ease-in-out bg-transparent text-vintage-ink border-2 border-vintage-ink hover:bg-vintage-ink hover:text-[#f5deb3] hover:shadow-lg hover:shadow-vintage-ink/30"
          >
            Sign Up
          </button>

          <button
            onClick={handleClick2}
            className="px-6 py-3 rounded-md text-lg font-serif font-medium w-32 transition-all duration-300 ease-in-out bg-transparent text-vintage-ink border-2 border-vintage-ink hover:bg-vintage-ink hover:text-[#f5deb3] hover:shadow-lg hover:shadow-vintage-ink/30"
          >
            Login
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center p-4 md:p-0">
        <div className="w-full h-64 md:h-full relative">
          <EnhancedTimeCapsuleAnimation />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
