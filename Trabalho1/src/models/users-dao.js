const { db } = require("../database/db.connection");

class UserDao {
  constructor() {}

  getUsers() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM user`, (error, rows) => {
        if (error) {
          console.error("HOUVE UM ERRO AO CONSULTAR OS DADOS");
          console.error({ error });
          reject(error);
        }
        resolve(rows);
      });
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM user where ID = ?`, [id], (error, rows) => {
        if (error) {
          console.error("HOUVE UM ERRO AO CONSULTAR OS DADOS");
          console.error({ error });
          reject(error);
        }

        if (rows.length > 0) resolve(rows[0]);

        reject(null);
      });
    });
  }

  addUsers(user) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO user (name, cpf, password, phones, emails) VALUES(?, ?, ?, ?, ?)";
      db.run(
        sql,
        [
          user.name,
          user.cpf,
          user.password,
          user.phonesString,
          user.emailsString,
        ],
        (err) => {
          if (err) {
            console.log({ err });
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  updateUser(userId, updatedUser) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE user SET name = ?, cpf = ?, password = ?, phones = ?, emails = ? WHERE id = ?";
      db.run(
        sql,
        [
          updatedUser.name,
          updatedUser.cpf,
          updatedUser.password,
          updatedUser.phonesString,
          updatedUser.emailsString,
          userId,
        ],
        (err) => {
          if (err) {
            console.log({ err });
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM user WHERE id = ?";
      db.run(sql, [userId], (err) => {
        if (err) {
          console.log({ err });
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = { UserDao };
