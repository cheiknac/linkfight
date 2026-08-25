import { Router } from "express";
import palmares from "../controllers/palmares.js";
import authMiddleware from "../middlewares/auth.js";

const palmaresRouter = Router();

palmaresRouter.get('/palmares/me', authMiddleware, palmares.getMyPalmares);
palmaresRouter.post('/palmares', authMiddleware, palmares.createPalmares);

palmaresRouter
    .route("/palmares/:id")
    .put(authMiddleware, palmares.updatePalmares)
    .delete(authMiddleware, palmares.deletePalmares);

export default palmaresRouter;