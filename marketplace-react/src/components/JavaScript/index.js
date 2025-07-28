import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";

function Index() {
  const navigate = useNavigate();

  const handleProtectedClick = (e) => {
    e.preventDefault();
    const confirmacion = window.confirm("No ha iniciado sesión. ¿Desea ir a la página de inicio de sesión?");
    if (confirmacion) {
      navigate("/login");
    }
  };

  return (
    <>
      <header>
        <h1>Marketplace EcuaLocal</h1>
        <nav>
          <ul>
            <li><a href="/login">Iniciar Sesión</a></li>
            <li><a href="/signup">Registrarse</a></li>
            <li><a href="#" onClick={handleProtectedClick}>Ver Productos</a></li>
            <li><a href="#" onClick={handleProtectedClick}>Panel de Vendedor</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h2>Encuentra los mejores productos de vendedores locales en nuestras tierras ecuatorianas</h2>
        <p>Apoya negocios cercanos y descubre grandes ofertas</p>
        <button id="inibutton" onClick={handleProtectedClick}>Explorar Productos</button>
      </section>

      <section className="info-index">
        <h2>¿Quiénes Somos?</h2>
        <h4>En Marketplace EcuaLocal, creemos en la conexión entre vendedores y compradores de manera rápida, segura y eficiente. Nuestra plataforma está diseñada para ofrecer una experiencia intuitiva, con herramientas que facilitan la gestión de productos, la seguridad en cada transacción y la comodidad de encontrar lo que necesitas en un solo lugar.</h4>
        <img className="img-producto" src="https://media.istockphoto.com/id/520221976/es/vector/verduras-en-el-mercado-de-agricultores-locales-de-venta.jpg?s=612x612&w=0&k=20&c=yPPaAa-9unMpMCnQfJGKrvkqoENrHUN4FWy-SPM6h-0=" alt="Marketplace" />
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Index;
