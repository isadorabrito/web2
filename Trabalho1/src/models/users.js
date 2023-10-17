class User {
  constructor(name, cpf, password, phones, emails) {
    this.name = name;
    this.cpf = cpf;
    this.password = password;
    this.phones = phones;
    this.emails = emails;
  }
}

module.exports = { User };
