import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setPasswordError("La contraseña debe tener mínimo 6 caracteres");
      return;
    } else {
      setPasswordError("");
    }

    if (email === "prueba@hotmail.com" && password === "PR1234") {
      alert("Inicio de sesión exitoso");
      navigate("/productos");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <>
      <header>
        <h1>Acceso al Marketplace</h1>
      </header>

      <section className="login-container">
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
          <span className="error" id="emailError"></span>


          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
          {passwordError && (
            <span className="error" style={{ color: "red" }}>{passwordError}</span>
          )}

          <span className="error" id="userError"></span>
          <button type="submit">Entrar</button>
        </form>

        <p>No tienes cuenta? <a href="/signup">Regístrate aquí</a></p>
        <p>Vuelve al <a href="/">Inicio aquí</a></p>
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default Login;