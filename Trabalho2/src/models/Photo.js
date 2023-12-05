const { EntitySchema } = require("typeorm");

const PhotoSchema = new EntitySchema({
  name: "Photo",
  tableName: "photo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      length: 255,
    },
    description: {
      type: "text",
    },
    createdAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    imageUrl: {
      type: "varchar",
      length: 255,
    },
    tags: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    userId: {
      type: "int",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "user",
      onDelete: "CASCADE",
      joinColumn: {
        name: "userId",
        referencedColumnName: "id",
      },
    },
    likes: {
      type: "one-to-many",
      target: "likes",
      inverseSide: "photo",
    },
  },
});

module.exports = { PhotoSchema };
