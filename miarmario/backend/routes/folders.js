const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const Item = require('../models/Item');
const User = require('../models/User');

// Crear una nueva carpeta
router.post('/folders', async (req, res) => {
    const { name, parent, owner } = req.body;
    try {
        const newFolder = new Folder({ name, parent, owner });
        await newFolder.save();
        res.status(201).json(newFolder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todas las carpetas de un usuario (nivel 1)
router.get('/folders/:userId', async (req, res) => {
    try {
        const folders = await Folder.find({ owner: req.params.userId, parent: null });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener subcarpetas dentro de una carpeta específica
router.get('/folders/:folderId/subfolders', async (req, res) => {
    try {
        const subfolders = await Folder.find({ parent: req.params.folderId });
        res.json(subfolders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una carpeta
router.put('/folders/:id', async (req, res) => {
    try {
        const updatedFolder = await Folder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFolder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una carpeta
router.delete('/folders/:id', async (req, res) => {
    try {
        const deletedFolder = await Folder.findByIdAndDelete(req.params.id);
        if (!deletedFolder) return res.status(404).json({ message: 'Folder not found' });
        res.json({ message: 'Folder deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
