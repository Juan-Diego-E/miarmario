const express = require('express');
const router = express.Router();

// Obtener todos los artículos
router.get('/', (req, res) => {
    res.send('Obtener todos los artículos');
});

// Crear un nuevo artículo
router.post('/', (req, res) => {
    res.send('Crear un nuevo artículo');
});

// Obtener un artículo por ID
router.get('/:id', (req, res) => {
    res.send(`Obtener artículo con ID ${req.params.id}`);
});

// Actualizar un artículo por ID
router.put('/:id', (req, res) => {
    res.send(`Actualizar artículo con ID ${req.params.id}`);
});

// Eliminar un artículo por ID
router.delete('/:id', (req, res) => {
    res.send(`Eliminar artículo con ID ${req.params.id}`);
});

module.exports = router;
