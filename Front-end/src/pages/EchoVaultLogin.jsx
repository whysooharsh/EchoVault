import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (redirect) {
      navigate("/dashboard");
    }
  }, [redirect, navigate]);

  return (
    <section className="min-h-screen w-full bg-transparent flex flex-col justify-center items-center selection:text-magical-gold selection:bg-vintage-ink/20">
      {popup.show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative px-6 py-5 border-4 border-double border-magical-gold/50 bg-[#fdf8e7] text-center font-serif text-lg text-vintage-ink shadow-2xl" style={{ minWidth: '250px', maxWidth: '90vw' }}>
            {popup.type === "error" && (
              <button
                onClick={() => setPopup({ show: false, message: "", type: "error" })}
                className="absolute top-2 right-3 text-vintage-ink/50 hover:text-vintage-ink text-xl font-bold bg-transparent border-none cursor-pointer focus:outline-none transition-colors"
                aria-label="Close error popup"
              >
                &times;
              </button>
            )}
            <div className="mb-1 text-vintage-ink font-serif break-words">
              {popup.type === "error" ? "❌ " : "✨ "}
              {popup.message}
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="bg-[#fdf8e7] border-4 border-double border-magical-gold/50 shadow-2xl p-8 rounded-sm relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-magical-gold to-transparent"></div>
          <div className="flex flex-col mb-8">
            <div>
              <h2 className="text-4xl text-vintage-ink font-serif font-bold text-center drop-shadow-sm">Log In</h2>
              <p className="text-center text-vintage-ink/70 font-serif italic mt-2">Enter your magical vault</p>
            </div>
          </div>
          <form onSubmit={login}>
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-2 text-sm font-serif font-bold text-vintage-ink">Username</label>
                <input type="text" placeholder="Your incantation name" onChange={(e) => setUsername(e.target.value)} className="block w-full px-5 py-3 text-vintage-ink bg-[#f4ecd8] border border-magical-gold/50 rounded-sm appearance-none placeholder:text-vintage-ink/40 focus:border-vintage-ink focus:outline-none focus:ring-1 focus:ring-vintage-ink font-serif" />
              </div>
              <div className="col-span-full">
                <label className="block mb-2 text-sm font-serif font-bold text-vintage-ink">Password</label>
                <input type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 text-vintage-ink bg-[#f4ecd8] border border-magical-gold/50 rounded-sm appearance-none placeholder:text-vintage-ink/40 focus:border-vintage-ink focus:outline-none focus:ring-1 focus:ring-vintage-ink font-serif" />
              </div>
              <div className="col-span-full pt-4 border-t-2 border-magical-gold/30">
                <button type="submit" className="w-full px-6 py-3 text-center text-[#f5deb3] duration-300 bg-vintage-ink border border-magical-gold rounded-md hover:bg-[#1a120d] focus:outline-none shadow-md font-serif text-lg flex items-center justify-center">
                  Unlock Vault
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
