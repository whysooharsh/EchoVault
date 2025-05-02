import Homepage from "./pages/homepage";
import Aboutus from "./pages/aboutus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";
import Signup from "./pages/signup";
import Explore from "./pages/explore";
import GetStarted from "./pages/getstarted";

function App() {
  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path= "/getstarted" element ={<GetStarted/>}/>
        </Route>
      {/* <Route element = {<Layout2/>}>
      <Route path="/dashboard/" element={<Dashboard />} />
      </Route> */}
    
      </Routes>
    </Router>
  );
}

export default App;
