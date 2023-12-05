const { Router } = require("express");
const router = Router();

const { PhotosController } = require("../controllers/photos-controller");
const { LikesController } = require("../controllers/likes-controller");

const { isAuth } = require("../middlewares/is-auth");

const photosController = new PhotosController();
const likesController = new LikesController();

router.get("/add-post", isAuth, (req, res) => {
  res.render("post-image");
});

router.post("/add-post", isAuth, (req, res) => {
  photosController.upload(req, res);
});

router.get("/home", isAuth, async (req, res) => {
  await photosController.showAllPhotos(req, res);
});

router.get("/image/:photoId", async (req, res) => {
  await photosController.getPhotoDetails(req, res);
});

router.post("/image/:photo_id", isAuth, (req, res) =>
  likesController.addLike(req, res)
);

router.post("/delete-photo/:photoId", isAuth, photosController.deletePhoto);

router.get("/perfil", isAuth, async (req, res) => {
  await photosController.getPhotosByUserId(req, res);
});

module.exports = {
  photosRouter: router,
};
