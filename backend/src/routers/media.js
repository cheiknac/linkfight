import { Router } from "express";
import mediaController from "../controllers/media.js";

const mediaRouter = Router();

mediaRouter
    .route("/media")
    .get(mediaController.getAllMedia)
    .post(mediaController.createMedia);

mediaRouter
    .route("/media/:id")
    .get(mediaController.getMediaById) 
    .put(mediaController.updateMedia)
    .delete(mediaController.deleteMedia);

export default mediaRouter;