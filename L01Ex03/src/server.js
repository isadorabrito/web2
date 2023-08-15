import express from "express";
import { calculaFatorial } from "./fatorial.js";

const app = express();

app.get("/fatorial", (req, res) => {
  const numero = parseInt(req.query.numero);

  if (!isNaN(numero)) {
    const fatorial = calculaFatorial(numero);
    res.json({ fatorial });
  } else {
    res.status(400).json({ error: "Not a number" });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000);
