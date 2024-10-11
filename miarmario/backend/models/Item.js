const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true
    },
    size: String,
    color: String,
    image: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdWhen: {
        type: Date,
        default: Date.now
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    },
    orderIndex: { 
        type: Number, 
        default: 0 
    },
    tags: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tag' 
    }]
});

module.exports = mongoose.model('Item', itemSchema);