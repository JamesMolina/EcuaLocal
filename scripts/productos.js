document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorProductos');
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    const modal = document.getElementById("modalProducto");

    function mostrarProductos(listaProductos = productos) {
        contenedor.innerHTML = "";

        if (listaProductos.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron productos.</p>";
            return;
        }

        listaProductos.forEach((prod, idx) => {
            const div = document.createElement("div");
            div.classList.add("producto");

            div.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <p>$${prod.precio}</p>
                <div class="cantidad">
                    <button class="decrementar" data-index="${idx}">-</button>
                    <span id="cantidad-${idx}">1</span>
                    <button class="incrementar" data-index="${idx}">+</button>
                </div>
                <button onclick="agregarAlCarrito(${idx})">Añadir al carrito</button>
                <button class="detalles" data-index="${idx}">Ver detalles</button>
                <div class="detalles-info" id="detalles-${idx}" style="display: none;">
                    <p><strong>Categoría:</strong> ${prod.categoria.charAt(0).toUpperCase() + prod.categoria.slice(1)}</p>
                    <p><strong>Descripción:</strong></p>
                    <p>${prod.descripcion.replace(/\n/g, "<br>")}</p>
                </div>
            `;

            contenedor.appendChild(div);
        });

        document.querySelectorAll(".incrementar").forEach(btn => {
            btn.addEventListener("click", function () {
                let cantidadSpan = document.getElementById(`cantidad-${this.dataset.index}`);
                cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
            });
        });

        document.querySelectorAll(".decrementar").forEach(btn => {
            btn.addEventListener("click", function () {
                let cantidadSpan = document.getElementById(`cantidad-${this.dataset.index}`);
                if (parseInt(cantidadSpan.textContent) > 1) {
                    cantidadSpan.textContent = parseInt(cantidadSpan.textContent) - 1;
                }
            });
        });

        document.querySelectorAll(".detalles").forEach(btn => {
            btn.addEventListener("click", function () {
                const detallesDiv = document.getElementById(`detalles-${this.dataset.index}`);
                if (detallesDiv.style.display === "none") {
                    detallesDiv.style.display = "block";
                } else {
                    detallesDiv.style.display = "none";
                }
            });
        });
    }

    mostrarProductos();

    document.getElementById("filtrar").addEventListener("click", function () {
        const categoriaSeleccionada = document.getElementById("categoria").value;
        const precioMax = parseInt(document.getElementById("precio").value) || Infinity;
        const estadoSeleccionado = document.getElementById("estado").value;
        const nombreSeleccionado = document.getElementById("nombre").value;

        let productosFiltrados = productos.filter(p =>
            (categoriaSeleccionada === "todos" || p.categoria === categoriaSeleccionada) &&
            (p.precio <= precioMax) &&
            (estadoSeleccionado === "todos" || p.estado === estadoSeleccionado) && 
            (nombreSeleccionado === "" || p.nombre.toLowerCase().includes(nombreSeleccionado.toLowerCase()))
        );

        mostrarProductos(productosFiltrados);
    });
});

function agregarAlCarrito(index) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let cantidad = parseInt(document.getElementById(`cantidad-${index}`).textContent);

    let producto = { ...productos[index], cantidad };
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito!");
}

document.getElementById("cerrarSesion").addEventListener("click", function (e) {
    e.preventDefault();
    const confirmacion = confirm("¿Estás seguro de que quieres cerrar sesión?");

    if (confirmacion) {
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
    }
});

document.getElementById("inicio").addEventListener("click", function (e) {
    e.preventDefault();
    const confirmacion = confirm("Al ir a la página de inicio, se cerrará su sesión. ¿Deseas continuar?");

    if (confirmacion) {
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
    }
});
