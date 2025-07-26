import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../components/config";

import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      setPopup({ show: true, message: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "success" });
        setRedirect(true);
      }, 1000);
    } catch (error) {
      setPopup({ show: true, message: error?.response?.data?.message || "Login failed!", type: "error" });
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "error" });
      }, 2000);
    }
  }

  if (redirect) {
    navigate("/dashboard");
    return null;
  }

  return (
    <section className="min-h-screen w-full bg-[wheat] flex flex-col justify-center items-center selection:text-amber-600">
      {popup.show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/20 animate-fadeIn">
          <div className="relative px-5 py-4 rounded-lg border border-neutral-200 bg-white text-center font-normal text-base" style={{ minWidth: '220px', maxWidth: '90vw' }}>
            {popup.type === "error" && (
              <button
                onClick={() => setPopup({ show: false, message: "", type: "error" })}
                className="mx-auto mb-2 block text-neutral-400 hover:text-black text-lg font-bold bg-transparent border-none cursor-pointer focus:outline-none"
                aria-label="Close error popup"
              >
                &times;
              </button>
            )}
            <div className="mb-1 text-neutral-700 break-words">{popup.message}</div>
          </div>
        </div>
      )}
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="bg-neutral-50 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex flex-col mb-6">
            <div>
              <h2 className="text-4xl text-black font-bold text-center">Login</h2>
            </div>
          </div>
          <form onSubmit={login}>
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">Username</label>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">Password</label>
                <input type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)}  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
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

export default Login;
