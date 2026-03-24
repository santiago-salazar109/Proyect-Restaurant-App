const express = require("express");

const app = express();
const PORT = 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor del restaurante funcionando 🍽️");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});