import { Router } from 'express';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
    res.send("Hello world my backend")
});


export { mainRouter };