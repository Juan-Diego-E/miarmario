const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');

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

// Obtener artículos con filtros
router.get('/items', async (req, res) => {
    const { name, color, category, type, size, material } = req.query;

    const filter = {};
    
    if (name) {
        filter.$or = [
            { name: new RegExp(name, 'i') },
            { description: new RegExp(name, 'i') }
        ];
    }
    if (color) filter.color = color;
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (size) filter.size = size;
    if (material) filter.material = material;

    try {
        const items = await Item.find(filter).populate('createdBy');
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
