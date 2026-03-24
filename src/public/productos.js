async function cargarProductos() {
    const respuesta = await fetch("http://localhost:3000/productos");
    const productos = await respuesta.json();

    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        lista.appendChild(li);
    });
}

cargarProductos();
