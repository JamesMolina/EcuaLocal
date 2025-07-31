import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes hacer validaciones si deseas
    alert("Inicio de sesión exitoso");

    navigate("/productos");
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
          <span className="error" id="passwordError"></span>

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