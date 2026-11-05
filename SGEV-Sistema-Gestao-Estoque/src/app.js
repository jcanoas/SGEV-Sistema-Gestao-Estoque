const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
require('dotenv').config();

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Ligar o motor do Banco de Dados
connectDB();

// Importar as rotas de lotes, vendo se os caminho para o arquivos das rotas estão correto, ex: ./routes/lotes
const lotesRoutes = require('./routes/lotes'); // ou o caminho onde estão as suas rotas
app.use('/lotes', lotesRoutes);

// Rota de teste raiz
app.get('/', (req, res) => {
    res.json({ mensagem: 'API SGEV a funcionar com sucesso!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
