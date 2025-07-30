import React, { useState, useEffect } from "react";


function Dashboard() {

  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "electronica",
    estado: "nuevo",
    descripcion: "",
    imagen: ""
  });


  useEffect(() => {
    const prods = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(prods);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    let { nombre, precio, categoria, estado, descripcion, imagen } = form;
    nombre = nombre.trim();
    descripcion = descripcion.trim();
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(precio)) {
      alert("El precio debe tener máximo dos decimales.");
      return;
    }
    precio = parseFloat(precio);
    if (precio <= 0) {
      alert("El precio debe ser mayor a 0.");
      return;
    }
    if (nombre && precio && imagen && descripcion) {
      setProductos((prev) => [...prev, { nombre, precio, categoria, estado, imagen, descripcion }]);
      setForm({ nombre: "", precio: "", categoria: "electronica", estado: "nuevo", descripcion: "", imagen: "" });
    }
  };

  
  const handleGuardar = (idx, nuevo) => {
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(nuevo.precio)) {
      alert("El precio debe tener máximo dos decimales.");
      return;
    }
    if (nuevo.precio <= 0) {
      alert("El precio debe ser mayor a 0.");
      return;
    }
    if (window.confirm("¿Estás seguro de que quieres guardar los cambios?")) {
      alert("Cambios guardados");
      setProductos((prev) => prev.map((p, i) => (i === idx ? nuevo : p)));
    }
  };

  
  const handleEliminar = (idx) => {
    setProductos((prev) => prev.filter((_, i) => i !== idx));
  };


  const handleCerrarSesion = (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("carrito");
      window.location.href = "/";
    }
  };


  const handleInicio = (e) => {
    e.preventDefault();
    if (window.confirm("Al ir a la página de inicio, se cerrará su sesión. ¿Deseas continuar?")) {
      localStorage.removeItem("carrito");
      window.location.href = "/";
    }
  };

  return (
    <>
      <header style={{ position: 'relative' }}>
        <h1>Panel de Vendedor</h1>
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>Bienvenido, User</span>
          <img src={require("../../../../img/Perfil.png")} alt="User Icon" style={{ width: 20, height: 20 }} />
        </div>
        <nav>
          <ul>
            <li><a href="/" onClick={handleInicio}>Inicio</a></li>
            <li><a href="/productos">Mis Productos</a></li>
            <li><a href="/carrito">Carrito</a></li>
            <li><a href="/" id="cerrarSesion" onClick={handleCerrarSesion}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <section className="agregar-producto">
        <h2>Subir nuevo producto</h2>
        <form className="form-editar" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre del producto:</label>
          <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />

          <label htmlFor="precio">Precio:</label>
          <input type="decimal" id="precio" name="precio" value={form.precio} onChange={handleChange} required />

          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="alimentos">Alimentos</option>
          </select>

          <label htmlFor="estado">Estado del producto:</label>
          <select id="estado" name="estado" value={form.estado} onChange={handleChange}>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>

          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} required></textarea>

          <label htmlFor="imagen">Imagen (URL):</label>
          <input type="text" id="imagen" name="imagen" value={form.imagen} onChange={handleChange} required />

          <div></div>
          <button type="submit">Subir Producto</button>
        </form>
      </section>

      <section className="productos-vendedor">
        <h2>Mis productos</h2>
        <div id="listaProductos">
          {productos.length === 0 && <p>No hay productos aún.</p>}
          {productos.map((prod, idx) => (
            <ProductoEditable key={idx} prod={prod} idx={idx} onGuardar={handleGuardar} onEliminar={handleEliminar} />
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Marketplace EcuaLocal - Todos los derechos reservados</p>
      </footer>
    </>
  );
}


function ProductoEditable({ prod, idx, onGuardar, onEliminar }) {
  const [edit, setEdit] = useState({ ...prod });
  return (
    <div className="producto">
      <img src={edit.imagen} alt={edit.nombre} className="vista-imagen" />
      <form className="form-editar" onSubmit={e => { e.preventDefault(); onGuardar(idx, edit); }}>
        <label>Nombre:</label>
        <input type="text" value={edit.nombre} onChange={e => setEdit({ ...edit, nombre: e.target.value })} />
        <label>Precio:</label>
        <input type="decimal" value={edit.precio} onChange={e => setEdit({ ...edit, precio: e.target.value })} />
        <label>Categoría:</label>
        <select value={edit.categoria} onChange={e => setEdit({ ...edit, categoria: e.target.value })}>
          <option value="electronica">Electrónica</option>
          <option value="ropa">Ropa</option>
          <option value="hogar">Hogar</option>
          <option value="alimentos">Alimentos</option>
        </select>
        <label>Estado:</label>
        <select value={edit.estado} onChange={e => setEdit({ ...edit, estado: e.target.value })}>
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>
        <label>Descripción:</label>
        <textarea value={edit.descripcion} onChange={e => setEdit({ ...edit, descripcion: e.target.value })}></textarea>
        <label>Imagen:</label>
        <input type="text" value={edit.imagen} onChange={e => setEdit({ ...edit, imagen: e.target.value })} />
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => onEliminar(idx)}>Eliminar</button>
      </form>
    </div>
  );
}

export default Dashboard;
