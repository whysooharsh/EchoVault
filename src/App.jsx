import Homepage from "./pages/homepage";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App(){
  return ( 
    <Router>
      <Navbar />
      <Routes>
      <Route path = "/" element = {<Homepage />}/>
      </Routes>
    </Router>
  );
}

export default App;
