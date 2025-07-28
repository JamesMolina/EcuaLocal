document.getElementById("loginForm").onsubmit = function (e) {
    e.preventDefault();

    ["emailError", "passwordError", "userError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });

    let valido = true;

    const email = document.getElementById("email").value;
    if (!/\S+@\S+\.\S+/.test(email)) {
        showError("emailError", "Email inválido");
        valido = false;
    }

    const password = document.getElementById("password").value;
    if (password.length < 6) {
        showError("passwordError", "Contraseña demasiado corta");
        valido = false;
    }

    if (!(email === "prueba@hotmail.com" && password === "PR1234")) {
        showError("userError", "Usuario no registrado");
        valido = false;
    }


    if (valido) {
        alert("Inicio de sesión exitoso!");
        document.getElementById("emailError").textContent = "";
        document.getElementById("passwordError").textContent = "";
        document.getElementById("userError").textContent = "";
        this.reset();
        window.location.href = "productos.html";
    }
    
};

function showError(elementId, mensaje) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = mensaje;
}
