const { EntitySchema } = require("typeorm");

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      length: 50,
      unique: true,
    },
    name: {
      type: "varchar",
      length: 255,
    },
    email: {
      type: "varchar",
      length: 255,
    },
    password: {
      type: "varchar",
      length: 255,
    },
  },
  relations: {
    photos: {
      type: "one-to-many",
      target: "photo",
      inverseSide: "user",
    },
    likes: {
      type: "one-to-many",
      target: "likes",
      inverseSide: "user",
    },
  },
});

module.exports = { UserSchema };
