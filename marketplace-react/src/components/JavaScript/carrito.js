import React, { useState, useEffect } from "react";
import "../css/carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  // Actualiza localStorage y estado
  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Incrementar cantidad
  const incrementar = (idx) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[idx].cantidad++;
    actualizarCarrito(nuevoCarrito);
  };

  // Decrementar cantidad
  const decrementar = (idx) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[idx].cantidad > 1) {
      nuevoCarrito[idx].cantidad--;
      actualizarCarrito(nuevoCarrito);
    }
  };

  // Eliminar producto
  const eliminar = (idx) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(idx, 1);
    actualizarCarrito(nuevoCarrito);
  };

  // Finalizar compra
  const comprar = () => {
    if (carrito.length > 0) {
      alert("Compra realizada con éxito!");
      actualizarCarrito([]);
    } else {
      alert("No tienes productos en el carrito");
    }
  };

  // Confirmar cerrar sesión
  const cerrarSesion = (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("carrito");
      window.location.href = "index.html";
    }
  };

  // Calcular total
  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  // Construir elementos con React.createElement (sin JSX)
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "header",
      null,
      React.createElement("h1", null, "Tu Carrito"),
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 5,
          },
        },
        React.createElement("span", null, "Bienvenido, User"),
        React.createElement("img", {
          src: "img/Perfil.png",
          alt: "User Icon",
          style: { width: 20, height: 20 },
        })
      ),
      React.createElement(
        "nav",
        null,
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            null,
            React.createElement("a", { href: "productos.html" }, "Seguir Comprando")
          ),
          React.createElement(
            "li",
            null,
            React.createElement("a", { href: "dashboard.html" }, "Panel de Vendedor")
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "index.html", onClick: cerrarSesion, id: "cerrarSesion" },
              "Cerrar Sesión"
            )
          )
        )
      )
    ),

    React.createElement(
      "section",
      { className: "main" },
      React.createElement(
        "div",
        { className: "carrito" },
        React.createElement("h2", null, "Productos en tu carrito"),
        React.createElement(
          "div",
          { id: "listaCarrito" },
          carrito.length === 0
            ? React.createElement("p", null, "No tienes productos en el carrito.")
            : carrito.map((prod, idx) =>
                React.createElement(
                  "div",
                  { className: "producto-carrito", key: idx },
                  React.createElement("img", { src: prod.imagen, width: 60, alt: prod.nombre }),
                  React.createElement("h4", null, prod.nombre),
                  React.createElement("p", null, "$" + prod.precio),
                  React.createElement(
                    "div",
                    { className: "cantidad" },
                    React.createElement(
                      "button",
                      {
                        className: "decrementar",
                        onClick: () => decrementar(idx),
                        "data-index": idx,
                      },
                      "-"
                    ),
                    React.createElement("span", { id: `cantidad-carrito-${idx}` }, prod.cantidad),
                    React.createElement(
                      "button",
                      {
                        className: "incrementar",
                        onClick: () => incrementar(idx),
                        "data-index": idx,
                      },
                      "+"
                    )
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "eliminar",
                      onClick: () => eliminar(idx),
                      "data-index": idx,
                    },
                    "Eliminar"
                  )
                )
              )
        ),
        React.createElement(
          "h3",
          null,
          "Total: $",
          React.createElement("span", { id: "total" }, total.toFixed(2))
        ),
        React.createElement(
          "button",
          { id: "comprar", onClick: comprar },
          "Finalizar compra"
        )
      )
    ),

    React.createElement(
      "footer",
      null,
      React.createElement(
        "p",
        null,
        "\u00A9 2025 Marketplace EcuaLocal - Todos los derechos reservados"
      )
    )
  );
};

export default Carrito;
