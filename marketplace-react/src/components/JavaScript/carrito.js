import React, { useState, useEffect } from "react";
import perfilImg from "../../img/Perfil.png";
import "../css/carrito.css";

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(items);
  }, []);

  // Calcular total cada vez que cambia el carrito
  useEffect(() => {
    const nuevoTotal = carrito.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
    setTotal(nuevoTotal);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const incrementar = (idx) => {
    setCarrito((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const decrementar = (idx) => {
    setCarrito((prev) =>
      prev.map((p, i) =>
        i === idx && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  };

  const eliminar = (idx) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setCarrito((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const comprar = () => {
    if (carrito.length === 0) {
      alert("No tienes productos en el carrito");
      return;
    }
    alert("Compra realizada con éxito ✅");
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("carrito");
      window.location.href = "/";
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
          <span>Bienvenido, User</span>
          <img src={perfilImg} alt="User Icon" style={{ width: 20, height: 20 }} />
        </div>
        <nav>
          <ul>
            <li>
              <a href="/productos">Seguir Comprando</a>
            </li>
            <li>
              <a href="/dashboard">Panel de Vendedor</a>
            </li>
            <li>
              <a href="/" onClick={handleCerrarSesion}>
                Cerrar Sesión
              </a>
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
            carrito.map((prod, idx) => (
              <div key={idx} className="producto-carrito">
                <img src={prod.imagen} alt={prod.nombre} />
                <h4>{prod.nombre}</h4>
                <p>${prod.precio}</p>

                <div className="cantidad">
                  <button onClick={() => decrementar(idx)}>-</button>
                  <span>{prod.cantidad}</span>
                  <button onClick={() => incrementar(idx)}>+</button>
                </div>

                <button className="eliminar" onClick={() => eliminar(idx)}>
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
