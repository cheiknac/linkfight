import { Router } from 'express';

const mainRouter = Router();

/* import Controllers */
import userRouter from './user.js';
import sponsorRouter from './sponsor.js';
import mediaRouter from './media.js';
import sportProfilRouter from './sportprofil.js';
import palmaresRouter from './palmares.js';

mainRouter.get('/', (req, res) => {
    res.send("Hello world my backend")
});

mainRouter.use(userRouter);
mainRouter.use(sponsorRouter);
mainRouter.use(mediaRouter);
mainRouter.use(sportProfilRouter);
mainRouter.use(palmaresRouter);

export { mainRouter };