const { getRepository } = require("typeorm");
const { UserSchema } = require("../models/User");
const { dataSource } = require("../config/datasource");
const { userValidationSchema } = require("../validators/user-validator");

class UsersController {
  async login(req, res) {
    const { username, password } = req.body;
    const usersRepository = dataSource.getRepository(UserSchema);

    try {
      const user = await usersRepository.findOne({ where: { username } });

      if (username === user.username && password === user.password) {
        req.session.user = user;
        return res.redirect("/home");
      } else {
        return res.render("login", { error: "Credenciais inválidas" });
      }
    } catch (error) {
      return res.render("login", {
        error: "Erro ao fazer login. Tente novamente mais tarde",
      });
    }
  }

  async cria(req, res) {
    try {
      const user = req.body;

      const usersRepository = dataSource.getRepository(UserSchema);

      const { value, error } = userValidationSchema.validate(user, {
        abortEarly: false,
      });

      if (error) {
        const errorMessage = error.details.map((err) => err.message).join("; ");
        console.error(errorMessage);
        res.status(400).json({ error: errorMessage });
        return;
      }

      const newUser = usersRepository.create({
        username: value.username,
        name: value.name,
        email: value.email,
        password: value.password,
      });

      await usersRepository.save(newUser);

      return res.redirect("/");
    } catch (error) {
      return res.render("cadastro", {
        error: "Usuário já em uso",
      });
    }
  }

  async getUserById(userId) {
    const usersRepository = dataSource.getRepository(UserSchema);

    const user = await usersRepository.findOne({ where: { id: userId } });

    return user;
  }
}

module.exports = { UsersController };
