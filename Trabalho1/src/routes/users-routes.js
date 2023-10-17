const { Router } = require("express");
const router = Router();

const { UsersController } = require("../controllers/users-controller");

const userController = new UsersController();

router.get("/", (req, res) => userController.getUsers(req, res));

router.post("/add-users", (req, res) => userController.createUser(req, res));

router.get("/add-users", (req, res) => res.render("add-users"));

router.get("/edit-users/:id", (req, res) => userController.getUserById(req, res));

router.post("/edit-users/:id", (req, res) => userController.updateUser(req, res));

router.get("/delete-users/:id", (req,res) => userController.deleteUser(req,res));

router.post("/delete-users/:id", (req,res) => userController.deleteUser(req,res));

router.get('/generate-csv', (req, res) => userController.generateCSV(req, res));

router.get("*", (req, res) => res.status(404).send("Error 404: Página não encontrada"));

module.exports = {
  usersRouter: router,
};
