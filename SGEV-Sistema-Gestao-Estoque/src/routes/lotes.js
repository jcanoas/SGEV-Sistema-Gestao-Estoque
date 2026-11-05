const express = require('express');
const router = express.Router();

// Rota GET para listar os lotes, ligue ao Model do Mongoose quando estiver pronto
router.get('/', async (req, res) => {
    try {
        // Exemplo provisório ,pode substituir pelo modelo de base de dados, ex: Lote.find()
        res.json([]); 
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar lotes' });
    }
});

// Rota POST para criar um novo lote
router.post('/', async (req, res) => {
    try {
        const novoLote = req.body;
        // Aqui guardaria na base de dados ,ex: Lote.create(novoLote)
        res.status(201).json({ mensagem: 'Lote criado com sucesso!', lote: novoLote });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar lote' });
    }
});

module.exports = router;
