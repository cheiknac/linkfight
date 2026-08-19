import { Router } from "express";
import sportProfilController from "../controllers/sportprofil.js";
import authMiddleware from "../middlewares/auth.js";

const sportProfilRouter = Router();

// ⚠️ Important : "/me" doit être déclaré AVANT "/:id", sinon Express
// interprète "me" comme une valeur d'ID et la route générique le capte en premier.
sportProfilRouter
    .route("/sportprofil/me")
    .get(authMiddleware, sportProfilController.getMySportprofil)
    .put(authMiddleware, sportProfilController.upsertMySportprofil);

sportProfilRouter
    .route("/sportprofil")
    .get(sportProfilController.getAllSportprofils)
    .post(sportProfilController.createSportprofil);

sportProfilRouter
    .route("/sportprofil/:id")
    .get(sportProfilController.getSportprofilById)
    .put(sportProfilController.updateSportprofil)
    .delete(sportProfilController.deleteSportprofil);


export default sportProfilRouter;