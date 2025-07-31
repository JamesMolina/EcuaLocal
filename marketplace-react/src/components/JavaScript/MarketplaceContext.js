import React, { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  // ------------------ Productos ------------------
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const prods = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(prods);
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  const editarProducto = (id, nuevoProducto) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...nuevoProducto, id } : p))
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // ------------------ Carrito ------------------
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(cart);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

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

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) return;
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    );
  };

  const eliminarProductoCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // Esta función ahora SOLO se usará en "Finalizar compra"
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
