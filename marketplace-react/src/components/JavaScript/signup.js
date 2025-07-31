import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

function Signup() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("natural");
  const [password, setPassword] = useState("");
  const [strengthText, setStrengthText] = useState("Muy débil");
  const [strengthColor, setStrengthColor] = useState("red");
  const [strengthWidth, setStrengthWidth] = useState("0%");

  const handleTipoUsuarioChange = (e) => {
    setTipoUsuario(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);

    let strength = 0;
    if (pass.length >= 6) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        setStrengthText("Muy débil");
        setStrengthColor("red");
        setStrengthWidth("25%");
        break;
      case 2:
        setStrengthText("Débil");
        setStrengthColor("orange");
        setStrengthWidth("50%");
        break;
      case 3:
        setStrengthText("Media");
        setStrengthColor("gold");
        setStrengthWidth("75%");
        break;
      case 4:
        setStrengthText("Fuerte");
        setStrengthColor("green");
        setStrengthWidth("100%");
        break;
      default:
        setStrengthText("Muy débil");
        setStrengthColor("red");
        setStrengthWidth("0%");
    }
  };

  // Aquí va el manejador del submit:
  const handleSubmit = (e) => {
    e.preventDefault();

    // ...Puedes agregar validaciones aquí si quieres

    alert("¡Registro exitoso!");
    navigate("/productos");
  };

  return (
    <div>
      <header>
        <h1>Regístrate en Marketplace Local</h1>
      </header>

      <section className="signup-container">
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" name="nombre" required />

          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <div id="strengthMeter">
            <div
              className="strength-bar"
              style={{
                width: strengthWidth,
                background: strengthColor,
                height: "6px",
                transition: "0.3s",
              }}
            ></div>
          </div>
          <span id="strengthText" style={{ color: strengthColor }}>
            {strengthText}
          </span>
          <br />

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />

          <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
          <select
            id="tipoUsuario"
            name="tipoUsuario"
            value={tipoUsuario}
            onChange={handleTipoUsuarioChange}
          >
            <option value="natural">Natural</option>
            <option value="juridico">Jurídico</option>
          </select>

          {tipoUsuario === "juridico" && (
            <>
              <label htmlFor="nombreNegocio">Nombre de tu negocio:</label>
              <input type="text" id="nombreNegocio" name="nombreNegocio" />

              <label htmlFor="ruc">RUC o razón social:</label>
              <input type="text" id="ruc" name="ruc" maxLength="13" />
            </>
          )}

          <br />
          <button type="submit">Registrarse</button>
        </form>

        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
        <p>
          Vuelve al <a href="/">Inicio aquí</a>
        </p>
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Signup;