const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const respuesta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.textContent = data.mensaje;
            mensaje.style.color = "red";
            return;
        }

        mensaje.textContent = "Login exitoso. Bienvenido " + data.empleado.nombre;
        mensaje.style.color = "green";

        localStorage.setItem("empleado", JSON.stringify(data.empleado));
        window.location.href = "/dashboard.html";

    } catch (error) {
        mensaje.textContent = "Error de conexión con el servidor";
        mensaje.style.color = "red";
    }
});
