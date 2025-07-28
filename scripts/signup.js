document.getElementById("tipoUsuario").addEventListener("change", function () {
    const tipo = this.value;
    const panelVendedor = document.getElementById("panelVendedor");
    if (tipo === "juridico") {
        panelVendedor.style.display = "block";
    } else {
        panelVendedor.style.display = "none";
    }
});

document.getElementById("signupForm").onsubmit = function (e) {
    e.preventDefault();

    ["nombreError", "emailError", "passwordError", "confirmPasswordError", "rucError", "nombreNegocioError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });

    let valido = true;

    const nombre = document.getElementById("nombre").value.trim();
    if (nombre === "") {
        showError("nombreError", "El nombre es obligatorio");
        valido = false;
    }

    const email = document.getElementById("email").value;
    if (!/\S+@\S+\.\S+/.test(email)) {
        showError("emailError", "Email inválido");
        valido = false;
    }

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password.length < 6) {
        showError("passwordError", "La contraseña debe tener al menos 6 caracteres");
        valido = false;
    }

    if (confirmPassword === "") {
        showError("confirmPasswordError", "Debe repetir la contraseña");
        valido = false;
    } else if (confirmPassword !== password) {
        showError("confirmPasswordError", "Las contraseñas no coinciden");
        valido = false;
    }

    const tipoUsuario = document.getElementById("tipoUsuario").value;
    if (tipoUsuario === "juridico") {
        const nombreNegocio = document.getElementById("nombreNegocio").value.trim();
        if (nombreNegocio === "") {
            showError("nombreNegocioError", "El nombre del negocio es obligatorio");
            valido = false;
        }

        const ruc = document.getElementById("ruc").value.trim();
        if (!/^\d{10}001$/.test(ruc)) {
            showError("rucError", "El RUC debe tener 10 dígitos seguidos de 001 (ej: 1351661739001)");
            valido = false;
        }
    }

    if (valido) {
        alert("Registro exitoso");
        this.reset();
        document.getElementById("panelVendedor").style.display = "none";
        document.querySelector('.strength-bar').style.width = '0%';
        document.querySelector('.strength-bar').style.background = 'red';
        document.getElementById('strengthText').textContent = 'Muy débil';
        document.getElementById('strengthText').style.color = 'red';
        window.location.href = "productos.html";
    }
};

document.getElementById('password').oninput = function () {
    const password = this.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strengthText');

    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const colors = ['red', 'orange', 'yellow', 'green'];
    const messages = ['Muy débil', 'Débil', 'Moderada', 'Fuerte'];

    const width = (strength / 4) * 100;
    strengthBar.style.width = `${width}%`;
    strengthBar.style.background = colors[strength - 1] || 'red';
    strengthText.textContent = messages[strength - 1] || 'Muy débil';
    strengthText.style.color = colors[strength - 1] || 'red';
};

function showError(elementId, mensaje) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = mensaje;
}
