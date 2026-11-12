const express = require('express');
const app = express();

app.use(express.json());

let bd = [
    { nombre: "Zack", apellido: "Gomez" },
    { nombre: "Ana", apellido: "Perez" }
];

const estrategias = {
    nombre: (a, b) => a.nombre.localeCompare(b.nombre),

    apellido: (a, b) => a.apellido.localeCompare(b.apellido),

    defecto: (a, b) => 0
};

app.get('/personas', (req, res) => {
    const tipoOrden = req.query.ordenarPor || 'defecto';

    const estrategia = estrategias[tipoOrden] || estrategias.defecto;

    const datosOrdenados = [...bd].sort(estrategia);

    res.json(datosOrdenados);
});

app.get('/prueba', (req, res) => { 
    res.send("¡El servidor de Node está vivo!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor encendido. Entra a http://localhost:${PORT}`);
});