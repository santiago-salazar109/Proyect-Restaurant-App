// ===============================
// INDEX.JS - API DE RESTAURANTE
// Autor: Santiago Salazar
// ===============================

// -------------------------------
// 1. IMPORTACIÓN DE MÓDULOS
// -------------------------------
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// -------------------------------
// 2. MIDDLEWARES
// -------------------------------
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mostrar login al entrar a la raíz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// -------------------------------
// 3. DATOS EN MEMORIA
// -------------------------------

// Productos (TU LISTA ORIGINAL)
let productos = [
    { id: 1, titulo: "crepe de pollo", precio: 30000 },
    { id: 2, titulo: "crepe de carne", precio: 30000 },
    { id: 3, titulo: "cerveza nacional", precio: 10000 },
    { id: 4, titulo: "cerveza importada", precio: 20000 },
    { id: 5, titulo: "café", precio: 5000 }
];

// Empleados
let empleados = [
    { id: 1, nombre: "Administrador", email: "admin@restaurante.com", password: "admin123", rol: "administrador" },
    { id: 2, nombre: "Laura Gómez", email: "laura@restaurante.com", password: "laura123", rol: "mesera" }
];

let empleadoId = 3;

// -------------------------------
// 4. CRUD DE PRODUCTOS
// -------------------------------

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.get("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(producto);
});

app.post("/productos", (req, res) => {
    const { titulo, precio } = req.body;

    const nuevoProducto = {
        id: productos.length + 1,
        titulo,
        precio
    };

    productos.push(nuevoProducto);
    res.json({ mensaje: "Producto agregado correctamente", producto: nuevoProducto });
});

app.put("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    const { titulo, precio } = req.body;
    producto.titulo = titulo || producto.titulo;
    producto.precio = precio || producto.precio;

    res.json({ mensaje: "Producto actualizado correctamente", producto });
});

app.delete("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ mensaje: "Producto no encontrado" });

    const eliminado = productos.splice(index, 1);
    res.json({ mensaje: "Producto eliminado correctamente", producto: eliminado[0] });
});

// -------------------------------
// 5. CRUD DE EMPLEADOS
// -------------------------------

app.get("/empleados", (req, res) => {
    res.json(empleados);
});

app.post("/empleados", (req, res) => {
    const { nombre, email, password, rol } = req.body;

    const nuevoEmpleado = {
        id: empleadoId++,
        nombre,
        email,
        password,
        rol
    };

    empleados.push(nuevoEmpleado);
    res.json({ mensaje: "Empleado creado correctamente", empleado: nuevoEmpleado });
});

// -------------------------------
// 6. LOGIN DE EMPLEADOS
// -------------------------------

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const empleado = empleados.find(e => e.email === email);

    if (!empleado || empleado.password !== password) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    res.json({
        mensaje: "Login exitoso",
        empleado: {
            id: empleado.id,
            nombre: empleado.nombre,
            rol: empleado.rol
        }
    });
});

// -------------------------------
// 7. INICIAR SERVIDOR
// -------------------------------
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
