function Homepage() { 
  
  
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
          font-family : Fredoka;
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
          <div>Where the past echos, future listens</div>
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
          display : "flex",
          gap : "40px",

        }}>
        <button style={{
          padding : "10px",
          borderRadius : "12px",
          cursor : "pointer",
          fontSize : "16px",
          width : "80px",

        }}>SignUp</button>
        <button style={{
          padding : "10px",
          borderRadius : "12px",
          cursor : "pointer",
          fontSize : "16px",
          width : "80px",

        }}>Login</button>
        </div>
      </div>
      {/* next part  */}
      <div
        style={{
          flex: "1",
          backgroundImage: "url('./assets/file.webp)",
          backgroundSize: 'cover',  
          backgroundPosition: 'center',  
        }}
      ></div>
    </div>
  );
}

export default Homepage;
