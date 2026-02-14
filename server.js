const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(helmet());

// Proteção contra brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Simulação de banco
const users = [];

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Dados inválidos" });

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ name, email, password: hashedPassword });

  res.json({ message: "Usuário criado com sucesso" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Senha inválida" });

  const token = jwt.sign({ email: user.email }, "SECRET_KEY", {
    expiresIn: "1h"
  });

  res.json({ token });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
