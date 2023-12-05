const { DataSource } = require("typeorm");
const { UserSchema } = require("../models/User");
const { PhotoSchema } = require("../models/Photo");
const { LikeSchema } = require("../models/Like");
const { join } = require("path");

const dataSource = new DataSource({
  type: "sqlite",
  database: "data.db",
  logging: true,
  //synchronize: true,
  entities: [UserSchema, PhotoSchema, LikeSchema],
  migrations: [join(__dirname, "..", "..", "**", "migrations/*.js")],
});

module.exports = { dataSource };
