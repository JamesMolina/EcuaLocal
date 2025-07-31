import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

function Signup() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("natural");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strengthText, setStrengthText] = useState("Muy débil");
  const [strengthColor, setStrengthColor] = useState("red");
  const [strengthWidth, setStrengthWidth] = useState("0%");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [ruc, setRuc] = useState("");
  const [nombreNegocioError, setNombreNegocioError] = useState("");
  const [rucError, setRucError] = useState("");

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

    let valid = true;

    if (password.length < 6) {
      setPasswordError("La contraseña debe tener mínimo 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (tipoUsuario === "juridico") {
      if (!nombreNegocio.trim()) {
        setNombreNegocioError("El nombre del negocio es obligatorio");
        valid = false;
      } else {
        setNombreNegocioError("");
      }
      if (!ruc.trim()) {
        setRucError("El RUC o razón social es obligatorio");
        valid = false;
      } else if (!/^\d{10}001$/.test(ruc.trim())) {
        setRucError("El RUC debe de ser su número de cédula seguido de 001 Ej: 1399999999001");
        valid = false;
      } else {
        setRucError("");
      }
    } else {
      setNombreNegocioError("");
      setRucError("");
    }

    if (!valid) return;

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
          {passwordError && (
            <span className="error" style={{ color: "red" }}>{passwordError}</span>
          )}

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
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordError && (
            <span className="error" style={{ color: "red" }}>{confirmPasswordError}</span>
          )}

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
              <input
                type="text"
                id="nombreNegocio"
                name="nombreNegocio"
                value={nombreNegocio}
                onChange={e => setNombreNegocio(e.target.value)}
                required
              />
              {nombreNegocioError && (
                <span className="error" style={{ color: "red" }}>{nombreNegocioError}</span>
              )}

              <label htmlFor="ruc">RUC o razón social:</label>
              <input
                type="text"
                id="ruc"
                name="ruc"
                maxLength="13"
                value={ruc}
                onChange={e => setRuc(e.target.value)}
                required
              />
              {rucError && (
                <span className="error" style={{ color: "red" }}>{rucError}</span>
              )}
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