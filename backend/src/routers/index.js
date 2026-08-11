import { Router } from 'express';

const mainRouter = Router();

/* import Controllers */
import userRouter from './user.js';

mainRouter.get('/', (req, res) => {
    res.send("Hello world my backend")
});

mainRouter.use(userRouter);

export { mainRouter };