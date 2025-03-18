import Homepage from "./pages/homepage";
import Aboutus from "./pages/aboutus";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App(){
  return ( 
    <Router>
      <Navbar />
      <Routes>
      <Route path = "/" element = {<Homepage />}/>
      <Route path = "/aboutus" element = {<Aboutus />}/>
    
      </Routes>
    </Router>
  );
}

export default App;
