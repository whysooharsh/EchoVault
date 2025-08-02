import Homepage from "./pages/EchoVaultHomepage";
import Aboutus from "./pages/EchoVaultAboutUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/EchoVaultLogin";
import Layout from "./layout";
import Signup from "./pages/EchoVaultSignup";
import Dashboard from "./pages/EchoVaultDashboard";
import GetStarted from "./pages/EchoVaultGetStarted";
import ProtectedRoute from "./ProtectedRoute";
import ChatInterface from "./pages/EchoVaultChatUI";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/chat" 
            element = {
              <ProtectedRoute>
                <ChatInterface/>
              </ProtectedRoute>
            }
            />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
