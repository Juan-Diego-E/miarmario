const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth'); // Protegiendo las rutas
const Outfit = require('../models/Outfit');
const Item = require('../models/Item');

// Crear nuevo outfit con validaciones
router.post('/outfit', auth, async (req, res) => {
    try {
        const { name, torso, legs, shoes, accessories, lotion, tags } = req.body;

        // Validaciones para garantizar que los campos no estén vacíos
        if (!name || !torso || !legs || !shoes) {
            return res.status(400).json({ message: 'Nombre, torso, piernas y zapatos son requeridos' });
        }

        // Verificación de que los ítems pertenezcan al usuario
        const allItemIds = [...torso, ...legs, ...shoes, ...accessories, ...lotion];
        const userItems = await Item.find({ _id: { $in: allItemIds }, createdBy: req.user._id });

        if (userItems.length !== allItemIds.length) {
            return res.status(403).json({ message: 'Algunos ítems no pertenecen al usuario autenticado' });
        }

        const outfit = new Outfit({
            name,
            torso,
            legs,
            shoes,
            accessories,
            lotion,
            tags,
            userId: req.user._id
        });

        await outfit.save();
        res.status(201).json(outfit);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el outfit', error: error.message });
    }
});

// Obtener todos los outfits de un usuario
router.get('/outfits', auth, async (req, res) => {
    try {
        const outfits = await Outfit.find({ userId: req.user._id });
        res.status(200).json(outfits);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los outfits', error: error.message });
    }
});

// Filtro por nombre y orden alfabético con validación de "sort"
router.get('/search', auth, async (req, res) => {
    const { name, sort } = req.query;
    let filter = { userId: req.user._id };

    if (name) filter.name = { $regex: name, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas

    // Validación del parámetro "sort"
    if (sort && !['asc', 'desc'].includes(sort)) {
        return res.status(400).json({ message: 'El valor de "sort" debe ser "asc" o "desc"' });
    }

    try {
        const outfits = await Outfit.find(filter).sort(sort === 'asc' ? 'name' : '-name');
        res.status(200).json(outfits);
    } catch (error) {
        res.status(500).json({ message: 'Error en la búsqueda de outfits', error: error.message });
    }
});

// Generar outfit aleatorio
router.get('/random', auth, async (req, res) => {
    try {
        const allItems = await Item.find({ userId: req.user._id });

        const randomOutfit = {
            torso: getRandomItems(allItems, 'torso'),
            legs: getRandomItems(allItems, 'legs'),
            shoes: getRandomItems(allItems, 'shoes'),
            accessories: getRandomItems(allItems, 'accessory'),
            lotion: getRandomItems(allItems, 'lotion')
        };

        res.status(200).json(randomOutfit);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar conjunto aleatorio', error: error.message });
    }
});

function getRandomItems(items, type) {
    const filteredItems = items.filter(item => item.type === type);
    if (filteredItems.length === 0) {
        return null; // Si no hay ítems de este tipo, se retorna null
    }
    return filteredItems[Math.floor(Math.random() * filteredItems.length)];
}

// Actualizar un outfit
router.put('/outfit/:id', auth, async (req, res) => {
    try {
        const { name, torso, legs, shoes, accessories, lotion, tags } = req.body;

        // Verificación de que los ítems pertenezcan al usuario
        const allItemIds = [...torso, ...legs, ...shoes, ...accessories, ...lotion];
        const userItems = await Item.find({ _id: { $in: allItemIds }, createdBy: req.user._id });

        if (userItems.length !== allItemIds.length) {
            return res.status(403).json({ message: 'Algunos ítems no pertenecen al usuario autenticado' });
        }

        const updatedOutfit = await Outfit.findByIdAndUpdate(
            req.params.id,
            { name, torso, legs, shoes, accessories, lotion, tags },
            { new: true }
        );

        if (!updatedOutfit) return res.status(404).json({ message: 'Outfit no encontrado' });

        res.json(updatedOutfit);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el outfit', error: error.message });
    }
});

// Eliminar un outfit
router.delete('/outfit/:id', auth, async (req, res) => {
    try {
        const deletedOutfit = await Outfit.findByIdAndDelete(req.params.id);
        if (!deletedOutfit) return res.status(404).json({ message: 'Outfit no encontrado' });
        res.json({ message: 'Outfit eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el outfit', error: error.message });
    }
});

module.exports = router;
