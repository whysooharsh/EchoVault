function Login() {
    return (
      <div
        style={{
          margin: "0px",
          padding: "0px",
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "wheat",
          display: "flex",
          flexDirection: "column",
          paddingTop: "60px",
          overflow : "hidden",
        }}
      >
        <style>{`
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Fredoka;
              }
              body {
                background-color: wheat;
              }
            `}</style>
  
        <div
          style={{
            padding: "5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "1.4rem",
              padding: "1.2rem",
            }}
          >
            Login
          </div>
          <div
            style={{
              height: "480px",
              width: "25%",
              padding: "0 40px 40px 40px",
              border: "1px solid black",
              borderRadius: "0.8rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)", 
              backgroundColor: "transparent", 
              overflow : "hidden",
            }}
          >
            <form onSubmit={""}>
              <input
                style={{
                  marginTop : "1.2rem",
                  padding: "1rem 2rem",
                  width: "100%",
                  borderRadius: "0.4rem",
                  border: "1px solid #ccc",
                  overflow : "hidden",
                  background : "transparent",
                }}
                type="text"
                name="Email"
                placeholder="Email address*"
                required
              />
              <input
                style={{
                  marginTop : "1.2rem",
                  padding: "1rem 2rem",
                  width: "100%",
                  borderRadius: "0.4rem",
                  border: "1px solid #ccc",
                  overflow : "hidden",
                  background : "transparent",
                }}
                type="password"
                name="password"
                placeholder="Password*"
                required
              />
              <button style={{
                marginTop : "1.2rem",
                padding: "1rem 2rem",
                width: "100%",
                borderRadius: "0.4rem",
                border: "1px solid #ccc",
                overflow : "hidden",
                background : "red",


              }}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
  