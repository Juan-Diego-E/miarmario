const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');

// Crear nuevo artículo
router.post('/', async (req, res) => {
    try {
        const articulo = new Articulo(req.body);
        await articulo.save();
        res.status(201).json(articulo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los artículos
router.get('/', async (req, res) => {
    try {
        const articulos = await Articulo.find().populate('creadoPor');
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un artículo por ID
router.get('/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findById(req.params.id).populate('creadoPor');
        if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.json(articulo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un artículo
router.put('/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.json(articulo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un artículo
router.delete('/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndDelete(req.params.id);
        if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.json({ message: 'Artículo eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;