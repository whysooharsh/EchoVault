import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../components/config";

function Signup() { 
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect, navigate]);

  async function signup(ev) {
    ev.preventDefault();
    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      setPopup({ show: true, message: "Signup successful! Redirecting...", type: "success" });
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "success" });
        setRedirect(true);
      }, 1200);
    } catch (error) {
      setPopup({ show: true, message: error?.response?.data?.message || "Signup failed!", type: "error" });
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "error" });
      }, 2000);
    }
  }

  return (
    <section className="min-h-screen w-full bg-[wheat] flex flex-col justify-center items-center selection:text-amber-600">
      {popup.show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/20 animate-fadeIn">
          <div className={`relative px-5 py-4 rounded-lg border border-neutral-200 bg-white text-center font-normal text-base`} style={{ minWidth: '220px', maxWidth: '90vw' }}>
            <button
              onClick={() => setPopup({ show: false, message: '', type: popup.type })}
              className="mx-auto mb-2 block text-neutral-400 hover:text-black text-lg font-bold bg-transparent border-none cursor-pointer focus:outline-none"
              aria-label="Close popup"
            >
              &times;
            </button>
            <div className={`mb-1 break-words ${popup.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{popup.message}</div>
          </div>
        </div>
      )}
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="bg-neutral-50 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex flex-col mb-6">
            <div>
              <h2 className="text-4xl text-black font-bold text-center">Signup</h2>
            </div>
          </div>
          <form onSubmit={signup}>
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">Username</label>
                <input type="text" placeholder="username" onChange={(ev) => setUsername(ev.target.value)} className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">Password</label>
                <input type="password" placeholder="******"  onChange = {(ev) => setPassword(ev.target.value)} className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <div className="col-span-full">
                <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">Signup</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
