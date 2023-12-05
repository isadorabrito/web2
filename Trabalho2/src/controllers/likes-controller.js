const { getRepository } = require("typeorm");
const { LikeSchema } = require("../models/Like");
const { dataSource } = require("../config/datasource");

class LikesController {
  async addLike(req, res) {
    const photo_id = req.params["photo_id"];
    const userId = req.session?.user?.id;
    const likesRepository = dataSource.getRepository(LikeSchema);

    try {
      const alreadyLiked = await likesRepository.findOne({
        where: { photoId: photo_id, userId },
      });

      if (alreadyLiked) {
        return res.redirect("/home");
      }

      const newLike = likesRepository.create({
        userId,
        photoId: photo_id,
      });

      await likesRepository.save(newLike);

      return res.redirect(`/image/${photo_id}`);
    } catch (error) {
      console.error("Erro ao adicionar like:", error);
      return res.status(500).json({ error: "Erro ao adicionar like" });
    }
  }
}

module.exports = { LikesController };
