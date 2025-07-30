import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from "./components/JavaScript/index";
import Dashboard from "./components/JavaScript/dashboard";
import Login from "./components/JavaScript/login";
import Signup from "./components/JavaScript/signup"; 
import Carrito from "./components/JavaScript/carrito";
import Productos from "./components/JavaScript/productos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />
        <Route path="/carrito" element={<Carrito />} />  
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;
