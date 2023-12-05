const { getRepository } = require("typeorm");
const { PhotoSchema } = require("../models/Photo");
const { dataSource } = require("../config/datasource");

const { formidable } = require("formidable");
const { LikeSchema } = require("../models/Like");
const { photoValidationSchema } = require("../validators/photo-validator");
const { UsersController } = require("./users-controller");
const { UserSchema } = require("../models/User");

const usersController = new UsersController();

class PhotosController {
  async upload(req, res) {
    const form = formidable({
      uploadDir: "public/uploads",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro no upload" });
        return;
      }
      try {
        const photoRepository = dataSource.getRepository(PhotoSchema);

        const userId = req.session.user.id;

        const photo = {
          title: fields.title[0],
          description: fields.description[0],
          tags: fields.tags[0],
        };

        const { value, error } = photoValidationSchema.validate(photo, {
          abortEarly: false,
        });

        if (error) {
          const errorMessage = error.details
            .map((err) => err.message)
            .join("; ");
          console.error(errorMessage);
          res.status(400).json({ error: errorMessage });
          return;
        }

        const newPhoto = photoRepository.create({
          title: value.title,
          description: value.description,
          imageUrl: files.imageUrl[0].newFilename,
          tags: value.tags,
          userId,
        });

        await photoRepository.save(newPhoto);

        console.log(newPhoto);

        res.redirect("/home");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao salvar a foto" });
      }
    });
  }

  async showAllPhotos(req, res) {
    let page = parseInt(req.query.page) || 1;
    const photosPerPage = 10;
    const photoRepository = dataSource.getRepository(PhotoSchema);

    const userId = req.session.user.id;
    const user = await usersController.getUserById(userId);
    const countPhotos = await photoRepository.count();
    const totalPages = Math.ceil(countPhotos / photosPerPage);

    try {
      const photos = await photoRepository.find({
        take: photosPerPage,
        skip: (page - 1) * photosPerPage,
      });

      res.render("home", { photos, user, currentPage: page, totalPages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar as fotos" });
    }
  }

  async getPhotoDetails(req, res) {
    const { photoId } = req.params;
    const photoRepository = dataSource.getRepository(PhotoSchema);
    const likesRepository = dataSource.getRepository(LikeSchema);
    const usersRepository = dataSource.getRepository(UserSchema);

    try {
      const photo = await photoRepository.findOne({ where: { id: photoId } });
      const likes = await likesRepository.find({ where: { photoId: photoId } });
      const userIds = likes.map((like) => like.userId);
      const users = await usersRepository
        .createQueryBuilder("user")
        .where("user.id IN (:...ids)", { ids: userIds })
        .getMany();
      res.render("image", { photo, likes, users });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar a foto");
    }
  }

  async deletePhoto(req, res) {
    const { photoId } = req.params;

    try {
      const photoRepository = dataSource.getRepository(PhotoSchema);
      await photoRepository.delete(photoId);

      res.redirect("/home");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir a foto" });
    }
  }

  async getPhotosByUserId(req, res) {
    const { userId } = req.session.user.id;
    const photoRepository = dataSource.getRepository(PhotoSchema);
    const photos = await photoRepository.find({ where: { userId } });
    res.render("perfil", { photos });
  }
}

module.exports = { PhotosController };
