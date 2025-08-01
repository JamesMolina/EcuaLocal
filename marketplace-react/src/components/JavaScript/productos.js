import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import perfilImg from "../../img/Perfil.png";
import "../css/productos.css";
import { MarketplaceContext } from "./MarketplaceContext";

const Productos = () => {
  const navigate = useNavigate();
  const { productos, agregarProductoCarrito } = useContext(MarketplaceContext);
  const [usuario] = useState("User");

  
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [precioMax, setPrecioMax] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidades, setCantidades] = useState({});
  const [detallesVisibles, setDetallesVisibles] = useState({});

  useEffect(() => {
    const initial = {};
    productos.forEach((p) => {
      initial[p.id] = 1;
    });
    setCantidades(initial);
  }, [productos]);

  useEffect(() => {
    const filtrados = productos.filter((p) => {
      return (
        (categoria === "todos" || p.categoria === categoria) &&
        (estado === "todos" || p.estado === estado) &&
        (precioMax === "" || p.precio <= Number(precioMax)) &&
        (nombre === "" || p.nombre.toLowerCase().includes(nombre.toLowerCase()))
      );
    });
    setProductosFiltrados(filtrados);
  }, [categoria, estado, precioMax, nombre, productos]);

  const incrementar = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrementar = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const toggleDetalles = (id) => {
    setDetallesVisibles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAgregar = (producto) => {
    agregarProductoCarrito(producto, cantidades[producto.id]);
    alert("Producto añadido al carrito 🛒");
  };

const cerrarSesion = (e) => {
  e.preventDefault();
  console.log("[DEBUG] Botón Cerrar Sesión PRESIONADO");
  console.log("[DEBUG] Productos en localStorage ANTES de cerrar sesión:", JSON.parse(localStorage.getItem("productos")));
  console.log("[DEBUG] Carrito en localStorage ANTES de cerrar sesión:", JSON.parse(localStorage.getItem("carrito")));

  if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    console.log("[DEBUG] Redirigiendo a /");
    navigate("/");
  }
};


  const irInicio = (e) => {
    e.preventDefault();
    if (window.confirm("Al ir a la página de inicio, se cerrará su sesión. ¿Deseas continuar?")) {
      navigate("/");
    }
  };

  return (
    <div className="productos-page">
      <header>
        <h1>Productos en Venta</h1>
        <div className="usuario-info">
          <span>Bienvenido, {usuario}</span>
          <img src={perfilImg} alt="User Icon" className="perfil-img" />
        </div>
        <nav>
          <ul>
            <li><a href="/" onClick={irInicio}>Inicio</a></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/dashboard">Panel de Vendedor</Link></li>
            <li><a href="/" onClick={cerrarSesion}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      {/* ====== FILTROS ====== */}
      <section className="filtros">
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="alimentos">Alimentos</option>
          </select>
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>
        <div>
          <label htmlFor="precio">Precio máximo:</label>
          <input
            type="number"
            id="precio"
            placeholder="Ej: 100"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre del producto:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Buscar producto..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      </section>

      {/* ====== LISTA DE PRODUCTOS ====== */}
      <section className="productos-lista">
        {productosFiltrados.length === 0 ? (
          <p id="mensajeVacio">No se encontraron productos.</p>
        ) : (
          productosFiltrados.map((prod) => (
            <div className="producto" key={prod.id}>
              <img src={prod.imagen} alt={prod.nombre} />
              <h3>{prod.nombre}</h3>
              <p>${prod.precio}</p>

              <div className="cantidad">
                <button onClick={() => decrementar(prod.id)}>-</button>
                <span>{cantidades[prod.id]}</span>
                <button onClick={() => incrementar(prod.id)}>+</button>
              </div>

              <button onClick={() => handleAgregar(prod)}>Añadir al carrito</button>

              <button
                className="detalles"
                onClick={() => toggleDetalles(prod.id)}
              >
                {detallesVisibles[prod.id] ? "Ocultar detalles" : "Ver detalles"}
              </button>

              {detallesVisibles[prod.id] && (
                <div className="detalles-info">
                  <p><strong>Categoría:</strong> {prod.categoria.charAt(0).toUpperCase() + prod.categoria.slice(1)}</p>
                  <p><strong>Estado:</strong> {prod.estado.charAt(0).toUpperCase() + prod.estado.slice(1)}</p>
                  <p><strong>Descripción:</strong></p>
                  <p dangerouslySetInnerHTML={{
                    __html: prod.descripcion.replace(/\n/g, "<br>")
                  }} />
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Productos;