import { Router } from "express";
import sportProfilController from "../controllers/sportprofil.js";

const sportProfilRouter = Router();

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