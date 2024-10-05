const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Crear nuevo artículo
router.post('/item', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los artículos
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find().populate('createdBy');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un artículo por ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('createdBy');
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un artículo
router.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un artículo
router.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
