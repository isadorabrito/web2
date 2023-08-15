const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/initial.html", express.static(path.join(__dirname, "public")));

app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "../src/users.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("500: Internal Server Error");
      return;
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

app.get("/users/:nick", (req, res) => {
  const nick = req.params.nick;
  const filePath = path.join(__dirname, "../src/users.json");
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      res.status(500).send("500: Internal Server Error");
    }
    const users = JSON.parse(data);
    const user = users.find((u) => u.nick === nick);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("404: User Not Found");
    }
  });
});

app.get("/users/add", (req, res) => {
  const newNickname = req.query.n;

  const filePath = path.join(__dirname, "../src/users.json");

  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      res.status(500).send("500: Internal Server Error");
      return;
    }

    const users = JSON.parse(data);
    const newUser = { nick: newNickname };
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users), (error) => {
      if (error) {
        res.status(500).send("500: Internal Server Error");
      }
      res.redirect("/users");
    });
  });
});

app.listen(3000);
