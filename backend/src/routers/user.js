import { Router } from 'express';
import usersController from '../controllers/users.js';

const userRouter = Router();

userRouter
    .route("/users")
    .get(usersController.getAllUsers);


export default userRouter;