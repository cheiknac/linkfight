import { Router } from "express";
import imagesController from "../controllers/images.js";

const imagesRouter = Router();

imagesRouter
    .route("/images")
    .get(imagesController.getAllImages)
    .post(imagesController.createImage);

imagesRouter
    .route("/images/:id")
    .get(imagesController.getImageById)
    .put(imagesController.updateImage)
    .delete(imagesController.deleteImage);

export default imagesRouter;