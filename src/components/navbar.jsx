import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  useEffect(() => {
    const scroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Fredoka",
        height: "60px",
        width: "100%",
        backgroundColor: scrolling ? "rgba(245, 222, 179, 0.8)" : "transparent",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "10", 
        position: "fixed",
        overflow: "hidden",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease", 
        backdropFilter: scrolling ? "blur(5px)" : "none", 
        boxShadow: scrolling ? "0 4px 12px rgba(147, 143, 136, 0.6)" : "none", 
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
        }}
      >
         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "normal",
            marginLeft: "20px",
          }}
        >
          echo.vault
        </div>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "160px",
            marginRight: "100px",
          }}
        >
          <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ cursor: "pointer" }}>explore</div>
          </Link>
          <Link to="/aboutus" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ cursor: "pointer" }}>about us</div>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
          <button
            style={{
              backgroundColor: hover ? "black" : "transparent",
              color : hover ? "white" : "black",
              padding: "8px 16px",
              fontSize: "16px",
              fontFamily: "Fredoka",
              fontWeight: "normal",
              borderRadius: "8px",
              transition : "0.2s ease",
              cursor: "pointer",
              transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease", 
              transform: hover ? "scale(1.05)" : "scale(1)",
              
            }}
            onMouseEnter = {handleMouseEnter}
            onMouseLeave = {handleMouseLeave}
          >
            get started
            <span
              style={{
                content: '""',
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                transform: hover ? "scaleX(1)" : "scaleX(0)", 
                transformOrigin: "right center",
                transition: "transform 0.3s ease", 
                zIndex: "-1",
              }}
            />

          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
