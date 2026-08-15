import { Router } from "express";
import palmares from "../controllers/palmares.js";

const palmaresRouter = Router();

palmaresRouter
    .route("/palmares")
    .get(palmares.getAllPalmares)
    .post(palmares.createPalmares);

palmaresRouter
    .route("/palmares/:id")
    .get(palmares.getPalmaresById)
    .put(palmares.updatePalmares)
    .delete(palmares.deletePalmares);

export default palmaresRouter;