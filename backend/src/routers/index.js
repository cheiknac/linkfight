import { Router } from 'express';

const mainRouter = Router();

/* import Controllers */
import userRouter from './user.js';
import sponsorRouter from './sponsor.js';
import mediaRouter from './media.js';

mainRouter.get('/', (req, res) => {
    res.send("Hello world my backend")
});

mainRouter.use(userRouter);
mainRouter.use(sponsorRouter);
mainRouter.use(mediaRouter);

export { mainRouter };