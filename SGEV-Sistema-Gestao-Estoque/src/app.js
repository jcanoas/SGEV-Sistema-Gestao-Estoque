const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// 1. Configurações essenciais
app.use(cors()); // Libera o acesso para o frontend (evita erros de CORS)
app.use(express.json());

// 2. Caminho para o arquivo JSON de entregas
const ARQUIVO_ENTREGAS = path.join(__dirname, 'entregas.json');

// Função auxiliar para ler as entregas
function lerEntregasDoArquivo() {
  if (!fs.existsSync(ARQUIVO_ENTREGAS)) {
    return [];
  }
  try {
    const dados = fs.readFileSync(ARQUIVO_ENTREGAS, 'utf8');
    return JSON.parse(dados);
  } catch (err) {
    console.error('Erro ao ler arquivo entregas.json:', err);
    return [];
  }
}

// Função auxiliar para salvar as entregas
function salvarEntregasNoArquivo(entregas) {
  try {
    fs.writeFileSync(ARQUIVO_ENTREGAS, JSON.stringify(entregas, null, 2), 'utf8');
  } catch (err) {
    console.error('Erro ao escrever no arquivo entregas.json:', err);
  }
}

// ==========================================
// ROTAS DE ENTREGAS (Persistência em JSON)
// ==========================================

// GET: Retorna o histórico de entregas gravado no arquivo
app.get('/api/entregas', (req, res) => {
  const entregas = lerEntregasDoArquivo();
  res.json(entregas);
});

// POST: Adiciona uma nova entrega no arquivo JSON
app.post('/api/entregas', (req, res) => {
  const novaEntrega = {
    id: Date.now(),
    ...req.body
  };

  const entregas = lerEntregasDoArquivo();
  const entregasAtualizadas = [novaEntrega, ...entregas];
  
  salvarEntregasNoArquivo(entregasAtualizadas);

  res.status(201).json({
    mensagem: 'Entrega registrada com sucesso no servidor!',
    entrega: novaEntrega
  });
});

// ==========================================
// CONFIGURAÇÃO DOS LOTES E CONEXÃO MONGO
// ==========================================
// (Insira aqui o seu modelo Mongoose de lotes e as rotas /lotes que você já utiliza)

// Exemplo de conexão com o MongoDB (substitua pela sua string de conexão real ou variável de ambiente)
const MONGO_URI = process.env.MONGO_URI || 'sua_string_do_mongodb_aqui';

mongoose.connect(MONGO_URI)
  .then(() => console.log('📦 Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// 3. Inicialização do Servidor na porta 3000 (ou a porta padrão do Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});
