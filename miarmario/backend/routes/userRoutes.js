const express = require('express');
const router = express.Router();

// Obtener todos los usuarios
router.get('/users', (req, res) => {
    res.send('Get all users');
});

// Crear un nuevo usuario
router.post('/user', (req, res) => {
    res.send('Create a new user');
});

// Obtener un usuario por ID
router.get('/users/:id', (req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
});

// Actualizar un usuario por ID
router.put('/user/:id', (req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
});

// Eliminar un usuario por ID
router.delete('/user/:id', (req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
});

module.exports = router;
