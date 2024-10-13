const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tag = require('../models/Tag');
const Item = require('../models/Item');

// Crear una nueva etiqueta con límite en el plan gratuito
router.post('/tags', auth, async (req, res) => {
    const { name, color, createdBy } = req.body;
    try {
        if (!name || !createdBy) {
            return res.status(400).json({ message: 'Nombre y creador son obligatorios.' });
        }

        const existingTagsCount = await Tag.countDocuments({ createdBy });

        const maxTags = 5;
        if (existingTagsCount >= maxTags) {
            return res.status(403).json({
                message: 'Has alcanzado el límite de 5 etiquetas en el plan gratuito. Mejora tu plan para añadir más etiquetas.'
            });
        }

        const newTag = new Tag({ name, color, createdBy });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todas las etiquetas de un usuario
router.get('/tags/:userId', auth, async (req, res) => {
    try {
        const tags = await Tag.find({ createdBy: req.params.userId });
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/tags/assign', auth, async (req, res) => {
    const { itemId, tags } = req.body;
    try {
        // Validación básica
        if (!itemId || !tags || !Array.isArray(tags)) {
            return res.status(400).json({ message: 'ID del artículo y lista de etiquetas son obligatorios.' });
        }

        // Limitar el número de etiquetas a 10, por ejemplo
        if (tags.length > 5) {
            return res.status(400).json({ message: 'El artículo no puede tener más de 5 etiquetas.' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            { $set: { tags } },  // Reemplaza todas las etiquetas del artículo
            { new: true }
        ).populate('tags');
        
        if (!updatedItem) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una etiqueta
router.delete('/tags/:tagId', auth, async (req, res) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(req.params.tagId);
        if (!deletedTag) return res.status(404).json({ message: 'Etiqueta no encontrada' });
        res.json({ message: 'Etiqueta eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
