import './login.css';

const Login = () => {
  return (
    <>
      <header>
        <h1>Acceso al Marketplace</h1>
      </header>

      <section className="login-container">
        <h2>Inicia sesión</h2>
        <form id="loginForm">
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
          <span className="error" id="emailError"></span>

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
          <span className="error" id="passwordError"></span>

          <span className="error" id="userError"></span>
          <button type="submit">Entrar</button>
        </form>

        <p>No tienes cuenta? <a href="signup.html">Regístrate aquí</a></p>
        <p>Vuelve al <a href="index.html">Inicio aquí</a></p>
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default Login;