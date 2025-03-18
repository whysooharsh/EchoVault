function Aboutus() {
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
          padding: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            padding: "30px",
            
          }}
        >
          echo.vault
        </div>

        <div
  style={{
    fontSize: "1.2rem",
    maxWidth: "600px",
    marginBottom: "20px",  
    lineHeight: "1.7",    
    color: "#333",         
     
  }}
>
  AI Memory Capsule is a digital time vault where you can send messages
  to your future self. When the time comes, AI reads your old messages
  and responds—reminding you of your goals, past thoughts, or even
  roasting you a little. It's like a diary, but smarter.
</div>

<div
  style={{
    fontSize: "2rem",
    padding: "1rem",
    fontWeight: "bold",    
    color: "#333",        
    
    textAlign: "center", 
    letterSpacing: "2px", 
  }}
>
  Features
</div>

<ul
  style={{
    fontSize: "1.2rem",
    textAlign: "start",
    padding: "0",         
    margin: "0",          
    listStyleType: "none", 
    lineHeight: "1.8",    
    color: "#555",        
    fontFamily: "'Roboto', sans-serif",
     }}
>
  <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
    <span
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "6px",
        height: "6px",
        backgroundColor: "#FF5722",  
        borderRadius: "50%",  
      }}
    ></span>
    Write & lock messages for future you
  </li>
  <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
    <span
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "6px",
        height: "6px",
        backgroundColor: "#FF5722", 
        borderRadius: "50%", 
      }}
    ></span>
    AI-generated responses based on past messages
  </li>
  <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
    <span
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "6px",
        height: "6px",
        backgroundColor: "#FF5722",  
        borderRadius: "50%",  
      }}
    ></span>
    See if you kept your promises (or flopped)
  </li>
  <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
    <span
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "6px",
        height: "6px",
        backgroundColor: "#FF5722", 
        borderRadius: "50%",  
      }}
    ></span>
    Reply to your past self & keep the convo going
  </li>
  <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
    <span
      style={{
        position: "absolute",
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "6px",
        height: "6px",
        backgroundColor: "#FF5722",  
        borderRadius: "50%", 
      }}
    ></span>
    Simple, private, and secure
  </li>
</ul>

      </div>
    </div>
  );
}

export default Aboutus;
