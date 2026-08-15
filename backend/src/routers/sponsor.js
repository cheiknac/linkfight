import { Router } from "express";
import sponsorController from "../controllers/sponsor.js";

const sponsorRouter = Router();

sponsorRouter
    .route("/sponsors")
    .get(sponsorController.getAllSponsors)
    .post(sponsorController.createSponsor);

sponsorRouter
    .route("/sponsors/:id")
    .get(sponsorController.getSponsorById) 
    .put(sponsorController.updateSponsor)
    .delete(sponsorController.deleteSponsor);


export default sponsorRouter;