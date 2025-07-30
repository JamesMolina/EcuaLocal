import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

function Signup() {
  return (
    <div>
      <header>
        <h1>Regístrate en Marketplace Local</h1>
      </header>

      <section className="signup-container">
        <h2>Crear una cuenta</h2>
        <form id="signupForm">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" name="nombre" required />
          <span className="error" id="nombreError"></span>

          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />
          <span className="error" id="emailError"></span>

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
          <span className="error" id="passwordError"></span>

          <div id="strengthMeter">
            <div className="strength-bar" style={{ width: '0%', background: 'red' }}></div>
          </div>
          <span id="strengthText" style={{ color: 'red' }}>Muy débil</span>
          <br />

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
          <span className="error" id="confirmPasswordError"></span>

          <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
          <select id="tipoUsuario" name="tipoUsuario">
            <option value="natural">Natural</option>
            <option value="juridico">Jurídico</option>
          </select>

          <div id="panelVendedor" className="oculto">
            <br />
            <label htmlFor="nombreNegocio">Nombre de tu negocio:</label>
            <input type="text" id="nombreNegocio" name="nombreNegocio" />
            <span className="error" id="nombreNegocioError"></span>

            <label htmlFor="ruc" id="labelRuc">RUC o razón social:</label>
            <input type="text" id="ruc" name="ruc" maxLength="13" />
            <span className="error" id="rucError"></span>
          </div>
          <br />
          <button type="submit">Registrarse</button>
        </form>

        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
        <p>Vuelve al <a href="/">Inicio aquí</a></p>
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Signup;