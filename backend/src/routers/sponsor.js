import { Router } from "express";
import sponsorController from "../controllers/sponsor.js";

const sponsorRouter = Router();

sponsorRouter
    .route("/sponsors")
    .get(sponsorController.getAllSponsors)


export default sponsorRouter;