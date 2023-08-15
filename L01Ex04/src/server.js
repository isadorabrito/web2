import express from "express";

const app = express();

app.get('/users/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  res.send(`Olá, ${nickname}`);
});

app.listen(3000);
