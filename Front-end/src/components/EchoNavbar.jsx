import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [hover, setHover] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const scroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-16 w-full font-['Fredoka'] transition-all duration-300 ${
        scrolling ? "bg-amber-100/40 backdrop-blur shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        <Link to="/" className="text-inherit no-underline">
          <div className="text-3xl font-normal ml-2 md:ml-5">echo.vault</div>
        </Link>

        <button
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-16 mr-10">
          <Link
            to="/aboutus"
            className="text-inherit no-underline cursor-pointer hover:text-gray-600 transition-colors"
          >
            <span className="text-lg">about us</span>
          </Link>
          <Link
            to="/getstarted"
            className={`relative overflow-hidden py-2 px-6 text-lg font-normal rounded-lg cursor-pointer transition-all duration-300 transform text-inherit no-underline ${
              hover
                ? "bg-black text-white scale-105 shadow-lg"
                : "bg-transparent text-black scale-100"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
          >
            get started
          </Link>
        </div>
      </div>

     
      <div
        className={`md:hidden transition-all origin-top duration-300 transform ${
          mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        } bg-amber-100 shadow-lg`}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          <Link
            to="/getstarted"
            className="text-black no-underline py-2 hover:text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            get started
          </Link>
          <Link
            to="/aboutus"
            className="text-black no-underline py-2 hover:text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            about us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
