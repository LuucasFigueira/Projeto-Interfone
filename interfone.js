const express = require('express');
const app = express();
app.use(express.json()); // (1)

const TOKEN = 'troque-por-um-segredo'; // (2)

app.post('/interfone', (req, res) => { // (3)
  if (req.headers['x-token'] !== TOKEN) {
    return res.status(401).json({ erro: 'não autorizado' });
  }

  const { tipo, bloco, apto } = req.body; // (4)
  if (!tipo || !bloco || !apto) {
    return res.status(400).json({ erro: 'faltam dados' });
  }

  console.log(`Chamada: ${tipo} - Bloco ${bloco}, Apto ${apto}`);
  res.json({ ok: true }); // (5)
});

app.listen(3000, () => console.log('Interfone ouvindo na porta 3000'));