import React, { useEffect, useState } from 'react';


function Homepage() {

  const [signup, setsignup] = useState(false);
  const [login, setlogin] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }
      
      @keyframes wave {
        0% { transform: translateY(0%); }
        50% { transform: translateY(-5%); }
        100% { transform: translateY(0%); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        height: "100vh",
        width: "100vw",
        backgroundColor: "wheat",
        display: "flex",
      }}
    >
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: wheat;
          font-family: Fredoka;
        }
      `}</style>

      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "",
            maxWidth: "60%",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          <div>Where the past echoes, future listens</div>
        </div>

        <div
          style={{
            maxWidth: "50%",
            textAlign: "center",
            margin: "7px auto",
          }}
        >
          Write to your future self, set a time lock, and let AI bring your past
          back with insights, and challenges
        </div>
        <br></br>
        <div style={{
          display: "flex",
          gap: "40px",
        }}>
          <button style={{
            backgroundColor : signup ? "black" : "transparent",
            color : signup ? "white" : "black",
            transition : "ease-in 0.3s",
            padding: "10px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            width: "80px",
          }}
        onMouseEnter={() => setsignup(true)}
        onMouseLeave={() => setsignup(false)}

          >SignUp</button>
          <button style={{
            backgroundColor : login ? "black" : "transparent",
            color : login ? "white" : "black",
            transition : "ease-in 0.3s",
            padding: "10px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            width: "80px",
          }}
        onMouseEnter={() => setlogin(true)}
        onMouseLeave={() => setlogin(false)}

          >Login</button>
        </div>
      </div>
      
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 600 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "80%",
            height: "80%",
          }}
        >
      
          <path
            d="M0 150 Q 50 50, 100 150 Q 150 250, 200 150 Q 250 50, 300 150 Q 350 250, 400 150 Q 450 50, 500 150 Q 550 250, 600 150"
            style={{
              stroke: "rgba(48, 165, 255, 0.8)",
              strokeWidth: "3",
              fill: "none",
            //  animation: "wave 4s ease-in-out infinite",
            }}
          />
          
      
          <path
            d="M0 150 Q 50 80, 100 150 Q 150 220, 200 150 Q 250 80, 300 150 Q 350 220, 400 150 Q 450 80, 500 150 Q 550 220, 600 150"
            style={{
              stroke: "rgba(255, 186, 23, 0.8)",
              strokeWidth: "3",
              fill: "none",
             // animation: "wave 3s ease-in-out infinite",
              animationDelay: "0.25s",
            }}
          />
          
 
          <path
            d="M0 150 Q 50 100, 100 150 Q 150 200, 200 150 Q 250 100, 300 150 Q 350 200, 400 150 Q 450 100, 500 150 Q 550 200, 600 150"
            style={{
              stroke: "rgba(255, 134, 111, 0.8)",
              strokeWidth: "3",
              fill: "none",
             // animation: "wave 5s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          />
          
        
          <path
            d="M0 150 Q 50 120, 100 150 Q 150 180, 200 150 Q 250 120, 300 150 Q 350 180, 400 150 Q 450 120, 500 150 Q 550 180, 600 150"
            style={{
              stroke: "rgba(151, 0, 244, 0.8)",
              strokeWidth: "3",
              fill: "none",
             // animation: "wave 6s ease-in-out infinite",
              animationDelay: "0.75s",
            }}
          />

    
          <path
            d="M0 150 Q 50 50, 100 150 Q 150 250, 200 150 Q 250 50, 300 150 Q 350 250, 400 150 Q 450 50, 500 150 Q 550 250, 600 150"
            style={{
              stroke: "rgba(255, 255, 255, 0.5)",
              strokeWidth: "3",
              fill: "none",
              strokeDasharray: "12, 12",
             // animation: "pulse 8s linear infinite",
              filter: "blur(2px)",
              opacity: "0.7",
            }}
          />
          

          <path
            d="M0 150 Q 50 80, 100 150 Q 150 220, 200 150 Q 250 80, 300 150 Q 350 220, 400 150 Q 450 80, 500 150 Q 550 220, 600 150"
            style={{
              stroke: "rgba(255, 255, 255, 0.5)",
              strokeWidth: "3",
              fill: "none",
              strokeDasharray: "12, 12",
              animation: "pulse 8s linear infinite",
              animationDelay: "0.25s",
              filter: "blur(2px)",
              opacity: "0.7",
            }}
          />
          

          <path
            d="M0 150 Q 50 100, 100 150 Q 150 200, 200 150 Q 250 100, 300 150 Q 350 200, 400 150 Q 450 100, 500 150 Q 550 200, 600 150"
            style={{
              stroke: "rgba(255, 255, 255, 0.5)",
              strokeWidth: "3",
              fill: "none",
              strokeDasharray: "12, 12",
              animation: "pulse 8s linear infinite",
              animationDelay: "0.5s",
              filter: "blur(2px)",
              opacity: "0.7",
            }}
          />
          
     
          <path
            d="M0 150 Q 50 120, 100 150 Q 150 180, 200 150 Q 250 120, 300 150 Q 350 180, 400 150 Q 450 120, 500 150 Q 550 180, 600 150"
            style={{
              stroke: "rgba(255, 255, 255, 0.5)",
              strokeWidth: "3",
              fill: "none",
              strokeDasharray: "12, 12",
              animation: "pulse 8s linear infinite",
              animationDelay: "0.75s",
              filter: "blur(2px)",
              opacity: "0.7",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export default Homepage;