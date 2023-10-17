const express = require("express");
const app = express();
const path = require("path");

const { usersRouter } = require("./routes/users-routes");

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));

app.use("/", usersRouter);

app.use("/add-users", usersRouter);

app.use("/edit-users", usersRouter);

app.use("/edit-users/:id", usersRouter);

app.use("/delete-users/:id", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
