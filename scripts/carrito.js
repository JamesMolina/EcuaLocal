document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const lista = document.getElementById("listaCarrito");
    const totalPrecio = document.getElementById("total");

    function actualizarCarrito() {
        lista.innerHTML = "";
        let total = 0;

        carrito.forEach((prod, idx) => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                <img src="${prod.imagen}" width="60">
                <h4>${prod.nombre}</h4>
                <p>$${prod.precio}</p>
                <div class="cantidad">
                    <button class="decrementar" data-index="${idx}">-</button>
                    <span id="cantidad-carrito-${idx}">${prod.cantidad}</span>
                    <button class="incrementar" data-index="${idx}">+</button>
                </div>
                <button class="eliminar" data-index="${idx}">Eliminar</button>
            `;
            lista.appendChild(div);
            total += parseFloat(prod.precio) * prod.cantidad;
        });

        totalPrecio.textContent = total;

        document.querySelectorAll(".incrementar").forEach(btn => {
            btn.addEventListener("click", function() {
                let cantidadSpan = document.getElementById(`cantidad-carrito-${this.dataset.index}`);
                carrito[this.dataset.index].cantidad++;
                cantidadSpan.textContent = carrito[this.dataset.index].cantidad;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            });
        });

        document.querySelectorAll(".decrementar").forEach(btn => {
            btn.addEventListener("click", function() {
                let cantidadSpan = document.getElementById(`cantidad-carrito-${this.dataset.index}`);
                if (carrito[this.dataset.index].cantidad > 1) {
                    carrito[this.dataset.index].cantidad--;
                    cantidadSpan.textContent = carrito[this.dataset.index].cantidad;
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
                }
            });
        });

        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", function() {
                carrito.splice(this.dataset.index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            });
        });
    }

    document.getElementById("comprar").addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Compra realizada con éxito!");
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        } else {
            alert("No tienes productos en el carrito");
        }
    });

    actualizarCarrito();
});

document.getElementById("cerrarSesion").addEventListener("click", function (e) {
    e.preventDefault();
    const confirmacion = confirm("¿Estás seguro de que quieres cerrar sesión?");
    
    if (confirmacion) {
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
    }
});