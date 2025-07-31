import React, { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  // ---------------------------
  // 📌 Estado de productos
  // ---------------------------
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const prods = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(prods);
  }, []);

  // Guardar productos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Agregar producto (para el dashboard)
  const agregarProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  // Editar producto
  const editarProducto = (id, nuevoProducto) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...nuevoProducto, id } : p))
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // ---------------------------
  // 📌 Estado del carrito
  // ---------------------------
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(cart);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto al carrito
  const agregarProductoCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  // Actualizar cantidad en carrito
  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) return;
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    );
  };

  // Eliminar producto del carrito
  const eliminarProductoCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        // Productos
        productos,
        agregarProducto,
        editarProducto,
        eliminarProducto,

        // Carrito
        carrito,
        agregarProductoCarrito,
        actualizarCantidad,
        eliminarProductoCarrito,
        vaciarCarrito
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};
