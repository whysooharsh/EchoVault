import { Homepage, Aboutus, Login, Signup, Dashboard, GetStarted, ChatInterface } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import ProtectedRoute from "./ProtectedRoute";

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
