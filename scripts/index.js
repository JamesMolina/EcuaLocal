document.getElementById("verProductos").addEventListener("click", function (e) {
    e.preventDefault();

    const confirmacion = confirm("No ha iniciado sesión. ¿Desea ir a la página de inicio de sesión?");
    
    if (confirmacion) {
        window.location.href = "login.html";
    }
});

document.getElementById("panelVendedor").addEventListener("click", function (e) {
    e.preventDefault();

    const confirmacion = confirm("No ha iniciado sesión. ¿Desea ir a la página de inicio de sesión?");
    
    if (confirmacion) {
        window.location.href = "login.html";
    }
});

document.getElementById("inibutton").addEventListener("click", function (e) {
    e.preventDefault();

    const confirmacion = confirm("No ha iniciado sesión. ¿Desea ir a la página de inicio de sesión?");
    
    if (confirmacion) {
        window.location.href = "login.html";
    }
});