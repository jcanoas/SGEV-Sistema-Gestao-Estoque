const express = require('express');
const router = express.Router();
const Lote = require('../models/Lote'); // Ajuste o caminho conforme a localização do model

// Rota GET: Buscar todos os lotes do MongoDB
router.get('/', async (req, res) => {
    try {
        const lotes = await Lote.find();
        res.json(lotes);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar lotes' });
    }
});

// Rota POST: Criar um novo lote no MongoDB
router.post('/', async (req, res) => {
    try {
        const novoLote = await Lote.create(req.body);
        res.status(201).json(novoLote);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar lote', detalhes: error.message });
    }
});

module.exports = router;
