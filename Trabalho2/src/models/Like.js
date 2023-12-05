const { EntitySchema } = require("typeorm");

const LikeSchema = new EntitySchema({
  name: "Likes",
  tableName: "likes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    photoId: {
      type: "int",
    },
    userId: {
      type: "int",
    },
  },
  relations: {
    photos: {
      type: "many-to-one",
      target: "photo",
      onDelete: "CASCADE",
      joinColumn: {
        name: "photoId",
        referencedColumnName: "id",
      },
    },
    users: {
      type: "many-to-one",
      target: "user",
      onDelete: "CASCADE",
      joinColumn: {
        name: "userId",
        referencedColumnName: "id",
      },
    },
  },
});

module.exports = { LikeSchema };
