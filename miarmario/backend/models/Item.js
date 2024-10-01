const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String, // Cambiado "descripcion" a "description"
    category: {
        type: String,  // "ropa", "calzado", "alhaja", etc.
        required: true
    },
    size: String,  // Agregado tamaño/talle
    color: String,
    image: String,  // Cambiado "imagen" a "image"
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Cambiado "Usuario" a "User"
        required: true
    },
    createdWhen: {
        type: Date,  // Cambiado a lowerCamelCase
        default: Date.now
    }
});

module.exports = mongoose.model('Item', itemSchema);
