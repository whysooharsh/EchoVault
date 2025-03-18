import Homepage from "./pages/homepage";
import Aboutus from "./pages/aboutus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";
import Signup from "./pages/signup";



function App(){
  return ( 
    <Router>
      <Layout />
      <Routes>
      <Route path = "/" element = {<Homepage />}/>
      <Route path = "/aboutus" element = {<Aboutus />}/>
      <Route path = "/login" element = {<Login />}/>
      <Route path = "/signup" element = {<Signup />}/>

      </Routes>
    </Router>
  );
}

export default App;
