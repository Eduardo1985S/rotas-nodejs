const express = require("express");
const app = express();

app.use(express.json()); // permite receber JSON

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Simulação de banco de dados
let usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Carlos" },
  { id: 3, nome: "Beatriz" },
  { id: 4, nome: "Daniel" },
  { id: 5, nome: "Eduardo" },
];

// GET - listar usuários
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// POST - criar usuário
app.post("/usuarios", (req, res) => {
  const novo = {
    id: usuarios.length + 1,
    nome: req.body.nome
  };
  usuarios.push(novo);
  res.status(201).json(novo);
});

// PUT - atualizar usuário
app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuario.nome = req.body.nome;
  res.json(usuario);
});

// DELETE - remover usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.json({ mensagem: "Usuário removido com sucesso" });
});

// Subir servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
