import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from "./components/JavaScript/index";
import Dashboard from "./components/JavaScript/dashboard";
import Login from "./components/JavaScript/login";
import Signup from "./components/JavaScript/signup"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
