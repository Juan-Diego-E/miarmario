const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    torso: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    legs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    shoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    lotion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Outfit', outfitSchema);
