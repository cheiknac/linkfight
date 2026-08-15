import { Router } from 'express';
import usersController from '../controllers/users.js';

const userRouter = Router();

userRouter
    .route("/users")
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

userRouter
    .route("/users/:id")
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);


export default userRouter;