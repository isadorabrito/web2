import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Bem vindo ao meu exercício!");
});

app.get("/nome/:nome", (req, res) => {
  const nome = req.params.nome;
  res.send(`Bem vindo(a), ${nome}!`);
});

app.get("/repetir/:mensagem/:quantidade", (req, res) => {
  const mensagem = req.params.mensagem;
  const quantidade = parseInt(req.params.quantidade);

  let resultado = "";
  for (let i = 0; i < quantidade; i++) {
    resultado += mensagem + " ";
  }

  res.send(resultado.trim());
});

app.get("/som/:animal", (req, res) => {
  const sons = {
    cao: "O cachorro faz 'Auuu Auuu Auuu'.",
    gato: "O gato faz 'Miauuu'.",
    vaca: "A vaca faz 'Mooon'.",
    ovelha: "A ovelha faz 'Meeeee'.",
    cavalo: "O cavalo faz 'Rhiiiii'.",
  };

  const animal = req.params.animal;
  const som = sons[animal] || "Animal Desconhecido";
  res.send(som);
});

app.use("*", (req, res) => {
  res.status(404).json("404 Not Found");
});

app.listen(3000);
