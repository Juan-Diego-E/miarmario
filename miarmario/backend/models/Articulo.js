const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    categoria: {
        type: String,  // "ropa", "calzado", "alhaja", etc.
        required: true
    },
    color: String,
    imagen: String,  // URL o path de la imagen subida
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',  // Relación con el usuario
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Articulo', articuloSchema);
