import React, { createContext, useState, useEffect } from "react";

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  // ------------------ Productos ------------------
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const prodsStr = localStorage.getItem("productos");
    console.log("[DEBUG] Leyendo productos desde localStorage:", prodsStr);

    if (prodsStr) {
      try {
        const prods = JSON.parse(prodsStr);
        if (Array.isArray(prods)) {
          setProductos(prods);
        } else {
          console.warn("[DEBUG] Formato inválido de productos en localStorage, no se actualiza");
        }
      } catch (e) {
        console.error("[DEBUG] Error al parsear productos:", e);
      }
    } else {
      console.log("[DEBUG] No hay productos en localStorage, manteniendo estado actual");
    }
  }, []);

  useEffect(() => {
    // Solo guardar si hay productos (evita sobreescribir con [])
    if (productos.length > 0) {
      localStorage.setItem("productos", JSON.stringify(productos));
      console.log("[DEBUG] Guardando productos en localStorage:", productos);
    }
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
    const cartStr = localStorage.getItem("carrito");
    console.log("[DEBUG] Leyendo carrito desde localStorage:", cartStr);

    if (cartStr) {
      try {
        const cart = JSON.parse(cartStr);
        if (Array.isArray(cart)) {
          setCarrito(cart);
        } else {
          console.warn("[DEBUG] Formato inválido de carrito en localStorage, no se actualiza");
        }
      } catch (e) {
        console.error("[DEBUG] Error al parsear carrito:", e);
      }
    } else {
      console.log("[DEBUG] No hay carrito en localStorage, manteniendo estado actual");
    }
  }, []);

  useEffect(() => {
    if (carrito.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("[DEBUG] Guardando carrito en localStorage:", carrito);
    }
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
