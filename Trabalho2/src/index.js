const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

const { DataSource } = require("typeorm");
const { UserSchema } = require("./models/User");
const { dataSource } = require("./config/datasource");

const { usersRouter } = require("./routes/users-routes");

const { photosRouter } = require("./routes/photos-routes");

app.use(
  session({
    secret: "sua-chave-secreta-aqui",
    resave: false,
    saveUninitialized: true,
  })
);

/* app.use(express.static(path.join(__dirname, "..", "public"))); */
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(usersRouter);
app.use(photosRouter);

dataSource
  .initialize()
  .then(async (connected) => {
    console.log({ connected });

    const usersRepository = dataSource.getRepository(UserSchema);
    const users = await usersRepository.find();
    console.log({ users });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error initializing the database:", error);
  });
