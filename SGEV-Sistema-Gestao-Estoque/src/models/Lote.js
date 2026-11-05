const mongoose = require('mongoose');

const loteSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    produto: { type: String, required: true },
    quantidade: { type: Number, required: true },
    validade: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Lote', loteSchema);
