import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import perfilImg from "../../img/Perfil.png";
import "../css/productos.css";

const Productos = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState(() => {
    return JSON.parse(localStorage.getItem("productos")) || [];
  });

  const [productosFiltrados, setProductosFiltrados] = useState(productos);

  const [categoria, setCategoria] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [precioMax, setPrecioMax] = useState("");
  const [nombre, setNombre] = useState("");

  const [cantidades, setCantidades] = useState(() => {
    const initial = {};
    productos.forEach((_, idx) => {
      initial[idx] = 1;
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
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

  const incrementar = (idx) => {
    setCantidades((prev) => ({
      ...prev,
      [idx]: prev[idx] + 1,
    }));
  };

  const decrementar = (idx) => {
    setCantidades((prev) => ({
      ...prev,
      [idx]: prev[idx] > 1 ? prev[idx] - 1 : 1,
    }));
  };

  const [detallesVisibles, setDetallesVisibles] = useState({});

  const toggleDetalles = (idx) => {
    setDetallesVisibles((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const agregarAlCarrito = (idx) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = {
      ...productosFiltrados[idx],
      cantidad: cantidades[idx],
    };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito!");
  };

  const cerrarSesion = (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("carrito");
      navigate("/");
    }
  };

  const irInicio = (e) => {
    e.preventDefault();
    if (window.confirm("Al ir a la página de inicio, se cerrará su sesión. ¿Deseas continuar?")) {
      localStorage.removeItem("carrito");
      navigate("/");
    }
  };

  return (
    <>
      <header>
        <h1>Productos en Venta</h1>
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
            <li><a href="/" onClick={irInicio}>Inicio</a></li>
            <li><a href="/carrito">Carrito</a></li>
            <li><a href="/dashboard">Panel de Vendedor</a></li>
            <li><a href="/" onClick={cerrarSesion}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <section className="filtros">
        <label htmlFor="categoria">Categoría:</label>
        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="electronica">Electrónica</option>
          <option value="ropa">Ropa</option>
          <option value="hogar">Hogar</option>
          <option value="alimentos">Alimentos</option>
        </select>

        <label htmlFor="estado">Estado:</label>
        <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>

        <label htmlFor="precio">Precio máximo:</label>
        <input
          type="number"
          id="precio"
          placeholder="Ejemplo: 100"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
        />

        <label htmlFor="nombre">Nombre de producto</label>
        <input
          type="text"
          id="nombre"
          placeholder="Ejemplo: Laptop"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button id="filtrar">Filtrar</button>
      </section>

      <section className="productos-lista" id="contenedorProductos">
        {productosFiltrados.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          productosFiltrados.map((prod, idx) => (
            <div className="producto" key={idx}>
              <img src={prod.imagen} alt={prod.nombre} />
              <h4>{prod.nombre}</h4>
              <p>${prod.precio}</p>
              <div className="cantidad">
                <button onClick={() => decrementar(idx)}>-</button>
                <span>{cantidades[idx]}</span>
                <button onClick={() => incrementar(idx)}>+</button>
              </div>
              <button onClick={() => agregarAlCarrito(idx)}>Añadir al carrito</button>
              <button onClick={() => toggleDetalles(idx)}>
                {detallesVisibles[idx] ? "Ocultar detalles" : "Ver detalles"}
              </button>
              {detallesVisibles[idx] && (
                <div className="detalles-info">
                  <p><strong>Categoría:</strong> {prod.categoria}</p>
                  <p><strong>Descripción:</strong></p>
                  <p dangerouslySetInnerHTML={{ __html: prod.descripcion.replace(/\n/g, "<br>") }} />
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default Productos;
