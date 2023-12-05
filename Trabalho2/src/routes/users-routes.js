const { Router } = require("express");
const router = Router();

const { UsersController } = require("../controllers/users-controller");

const usersController = new UsersController();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => usersController.login(req, res));

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/cadastro", (req, res) => res.render("cadastro"));

router.post("/cadastro", async (req, res) => {
  usersController.cria(req, res);
});

router.get("/error-auth", (req, res) => res.render("error-auth"));

module.exports = {
  usersRouter: router,
};
