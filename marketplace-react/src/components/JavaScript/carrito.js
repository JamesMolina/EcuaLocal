import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import perfilImg from "../../img/Perfil.png";
import "../css/carrito.css";
import { MarketplaceContext } from "./MarketplaceContext";

function Carrito() {
  const navigate = useNavigate();
  const { carrito, actualizarCantidad, eliminarProductoCarrito, vaciarCarrito } = useContext(MarketplaceContext);
  const [usuario] = useState("User");

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const comprar = () => {
    if (carrito.length === 0) {
      alert("No tienes productos en el carrito");
      return;
    }
    alert("Compra realizada con éxito ✅");
    vaciarCarrito();
  };

  const handleCerrarSesion = (e) => {
  e.preventDefault();
  if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    navigate("/"); // Solo redirige, no vacía nada
  }
};

  return (
    <>
      <header style={{ position: "relative" }}>
        <h1>🛒 Tu Carrito</h1>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span>Bienvenido, {usuario}</span>
          <img
            src={perfilImg}
            alt="User Icon"
            style={{ width: 20, height: 20, borderRadius: "50%" }}
          />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/productos">Seguir Comprando</Link>
            </li>
            <li>
              <Link to="/dashboard">Panel de Vendedor</Link>
            </li>
            <li>
              <Link to="/" onClick={handleCerrarSesion}>
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="carrito">
          <h2>Productos en tu carrito</h2>

          {carrito.length === 0 ? (
            <p>No tienes productos en el carrito.</p>
          ) : (
            carrito.map((prod) => (
              <div key={prod.id} className="producto-carrito">
                <img src={prod.imagen} alt={prod.nombre} />
                <h4>{prod.nombre}</h4>
                <p>${prod.precio}</p>

                <div className="cantidad">
                  <button onClick={() => actualizarCantidad(prod.id, prod.cantidad - 1)}>-</button>
                  <span>{prod.cantidad}</span>
                  <button onClick={() => actualizarCantidad(prod.id, prod.cantidad + 1)}>+</button>
                </div>

                <button
                  className="eliminar"
                  onClick={() => eliminarProductoCarrito(prod.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}

          <div className="carrito-total">
            <p>Total: ${total.toFixed(2)}</p>
          </div>

          <button id="comprar" onClick={comprar}>
            Finalizar compra
          </button>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Carrito;
