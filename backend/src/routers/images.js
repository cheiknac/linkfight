import { Router } from "express";
import imagesController from "../controllers/images.js";
import authMiddleware from "../middlewares/auth.js";
import { uploadGallery } from '../config/cloudinary.js';

const imagesRouter = Router();

imagesRouter.get('/images/me', authMiddleware, imagesController.getMyImages);
imagesRouter.post('/images', authMiddleware, uploadGallery.single('image'), imagesController.uploadImage);
imagesRouter.delete('/images/:id', authMiddleware, imagesController.deleteImage);

export default imagesRouter;