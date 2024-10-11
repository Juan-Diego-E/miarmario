const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const Item = require('../models/Item');

// Crear una nueva etiqueta
router.post('/tag', async (req, res) => {
    const { name, color, createdBy } = req.body;
    try {
        const newTag = new Tag({ name, color, createdBy });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todas las etiquetas de un usuario
router.get('tags/:userId', async (req, res) => {
    try {
        const tags = await Tag.find({ createdBy: req.params.userId });
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Asignar etiquetas a un artículo
router.put('/assign', async (req, res) => {
    const { itemId, tags } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            { $set: { tags } },  // Reemplaza todas las etiquetas del artículo
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una etiqueta
router.delete('tags/:tagId', async (req, res) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(req.params.tagId);
        if (!deletedTag) return res.status(404).json({ message: 'Etiqueta no encontrada' });
        res.json({ message: 'Etiqueta eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
