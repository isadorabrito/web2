const { UserDao } = require("../models/users-dao");
const fs = require("fs");

class UsersController {
  constructor() {
    this.usersDao = new UserDao();
  }

  async getUsers(req, res) {
    const allUsers = await this.usersDao.getUsers();

    let page = parseInt(req.query.page) || 1;

    const totalPages = Math.ceil(allUsers.length / 5);

    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;

    const users = allUsers.slice(startIndex, endIndex);

    res.render("list-users", { users, currentPage: page, totalPages });
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await this.usersDao.getUserById(id);
      return res.render("edit-users", {
        user: user,
      });
    } catch (error) {
      return res.send("Usuário não encontrado");
    }
  }

  async createUser(req, res) {
    const { name, cpf, password, phones, emails } = req.body;

    const filteredPhones = phones.filter((phone) => phone !== "");
    const phonesString = filteredPhones.join(",");

    const filteredEmails = emails.filter((email) => email !== "");
    const emailsString = filteredEmails.join(",");

    const user = {
      name,
      cpf,
      phonesString,
      emailsString,
      password,
    };

    try {
      await this.usersDao.addUsers(user);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const { name, cpf, password, phones, emails } = req.body;

    const filteredPhones = phones.filter((phone) => phone !== "");
    const phonesString = filteredPhones.join(",");

    const filteredEmails = emails.filter((email) => email !== "");
    const emailsString = filteredEmails.join(",");

    const updatedUser = {
      name,
      cpf,
      phonesString,
      emailsString,
      password,
    };

    try {
      await this.usersDao.updateUser(userId, updatedUser);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      await this.usersDao.deleteUser(userId);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Erro ao deletar usuário");
    }
  }

  async generateCSV(req, res) {
    try {
      const users = await this.usersDao.getUsers();

      const csvData = users
        .map(
          (user) =>
            `${user.id};${user.name};${user.cpf};${user.role};${
              user.phones.split(",")[0]
            };${user.emails.split(",")[0]}`
        )
        .join("\n");

      fs.writeFile("users.csv", csvData, (err) => {
        return res.download("users.csv", "users.csv");
      });
    } catch (error) {
      return res.status(500).send("Erro ao buscar os usuários.");
    }
  }
}

module.exports = {
  UsersController,
};
