const express = require('express');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', (req, res) => {
    res.send('Obtener todos los usuarios');
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    res.send('Crear un nuevo usuario');
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    res.send(`Obtener usuario con ID ${req.params.id}`);
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
    res.send(`Actualizar usuario con ID ${req.params.id}`);
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    res.send(`Eliminar usuario con ID ${req.params.id}`);
});

module.exports = router;
