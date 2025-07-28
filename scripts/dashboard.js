document.getElementById("productoForm").onsubmit = function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    let precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const estado = document.getElementById("estado").value;
    const imagen = document.getElementById("imagen").value;
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
        alert("El precio debe tener máximo dos decimales.");
        return;
    }

    precio = parseFloat(precio);

    if (precio <= 0) {
        alert("El precio debe ser mayor a 0.");
        return;
    }

    if (nombre && precio && imagen && descripcion) {
        const nuevoProducto = { nombre, precio, categoria, estado, imagen, descripcion };
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(productos));

        renderizarProductos();
        this.reset();
    }
};

function renderizarProductos() {
    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.forEach((prod, idx) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        const initialValues = { ...prod };

        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" class="vista-imagen">
            <form class="form-editar">
                <label>Nombre:</label>
                <input type="text" value="${prod.nombre}" class="editar-nombre">
                <label>Precio:</label>
                <input type="decimal" value="${prod.precio}" class="editar-precio">
                <label>Categoría:</label>
                <select class="editar-categoria">
                    <option value="electronica" ${prod.categoria === "electronica" ? "selected" : ""}>Electrónica</option>
                    <option value="ropa" ${prod.categoria === "ropa" ? "selected" : ""}>Ropa</option>
                    <option value="hogar" ${prod.categoria === "hogar" ? "selected" : ""}>Hogar</option>
                    <option value="alimentos" ${prod.categoria === "alimentos" ? "selected" : ""}>Alimentos</option>
                </select>
                <label>Estado:</label>
                <select class="editar-estado">
                    <option value="nuevo" ${prod.estado === "nuevo" ? "selected" : ""}>Nuevo</option>
                    <option value="usado" ${prod.estado === "usado" ? "selected" : ""}>Usado</option>
                </select>
                <label>Descripción:</label>
                <textarea class="editar-descripcion">${prod.descripcion || ""}</textarea>
                <label>Imagen:</label>
                <input type="text" value="${prod.imagen}" class="editar-imagen">
            </form>
            <button class="guardar" data-index="${idx}">Guardar Cambios</button>
            <button class="eliminar" data-index="${idx}">Eliminar</button>
        `;

        div.querySelector(".guardar").addEventListener("click", function () {
            const nuevoNombre = div.querySelector(".editar-nombre").value;
            const nuevoPrecio = parseFloat(div.querySelector(".editar-precio").value);
            const nuevaCategoria = div.querySelector(".editar-categoria").value;
            const nuevoEstado = div.querySelector(".editar-estado").value;
            const nuevaDescripcion = div.querySelector(".editar-descripcion").value;
            const nuevaImagen = div.querySelector(".editar-imagen").value;

            if (!/^\d+(\.\d{1,2})?$/.test(nuevoPrecio)) {
                alert("El precio debe tener máximo dos decimales.");
                return;
            }

            precio = parseFloat(precio);

            if (nuevoPrecio <= 0) {
                alert("El precio debe ser mayor a 0.");
                return;
            }

            if (
                nuevoNombre !== initialValues.nombre ||
                nuevoPrecio !== initialValues.precio ||
                nuevaCategoria !== initialValues.categoria ||
                nuevaDescripcion !== initialValues.descripcion ||
                nuevoEstado !== initialValues.estado ||
                nuevaImagen !== initialValues.imagen
            ) {
                if (!confirm("¿Estás seguro de que quieres guardar los cambios?")) {
                    return;
                }
                alert("Cambios guardados");
            }

            productos[idx].nombre = nuevoNombre;
            productos[idx].precio = nuevoPrecio;
            productos[idx].categoria = nuevaCategoria;
            productos[idx].estado = nuevoEstado;
            productos[idx].descripcion = nuevaDescripcion;
            productos[idx].imagen = nuevaImagen;

            localStorage.setItem("productos", JSON.stringify(productos));
            renderizarProductos();
        });

        div.querySelector(".eliminar").addEventListener("click", function () {
            productos.splice(idx, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            renderizarProductos();
        });

        lista.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", renderizarProductos);

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
