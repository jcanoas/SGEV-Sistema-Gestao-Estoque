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

// Importar as rotas de lotes
const lotesRoutes = require('./routes/lotes');
app.use('/lotes', lotesRoutes);

// Rota de teste raiz
app.get('/', (req, res) => {
    res.json({ mensagem: 'API SGEV a funcionar com sucesso!' });
});

// --- MÓDULO DE PERSISTÊNCIA DE ENTREGAS EM JSON ---
const fs = require('fs').promises;
const path = require('path');

const caminhoArquivoJson = path.join(__dirname, 'entregas.json');

app.get('/api/entregas', async (req, res) => {
  try {
    try {
      await fs.access(caminhoArquivoJson);
    } catch {
      await fs.writeFile(caminhoArquivoJson, JSON.stringify([], null, 2));
    }

    const dados = await fs.readFile(caminhoArquivoJson, 'utf-8');
    res.json(JSON.parse(dados));
  } catch (err) {
    console.error('Erro ao ler o ficheiro de entregas:', err);
    res.status(500).json({ error: 'Erro ao carregar histórico de entregas' });
  }
});

app.post('/api/entregas', async (req, res) => {
  try {
    const novaEntrega = { id: Date.now(), ...req.body };

    let entregas = [];
    try {
      const dados = await fs.readFile(caminhoArquivoJson, 'utf-8');
      entregas = JSON.parse(dados);
    } catch {
      entregas = [];
    }

    entregas.unshift(novaEntrega);
    await fs.writeFile(caminhoArquivoJson, JSON.stringify(entregas, null, 2));

    res.status(201).json({ message: 'Entrega registada com sucesso!', entrega: novaEntrega });
  } catch (err) {
    console.error('Erro ao salvar no ficheiro de entregas:', err);
    res.status(500).json({ error: 'Erro ao gravar a entrega' });
  }
});
// ----------------------------------------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
