import { Router } from 'express';
import usersController from '../controllers/users.js';
import authMiddleware from '../middlewares/auth.js';
import checkOwnership from '../middlewares/checkOwnership.js';

const userRouter = Router();

userRouter
    .get('/users/me', authMiddleware, usersController.getMe);

userRouter
    .route("/users")
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

userRouter
    .get("/profil/:slug", usersController.getUserBySlug);

userRouter
    .route("/users/:id")
    .get(usersController.getUserById)
    .put(authMiddleware, checkOwnership, usersController.updateUser)
    .delete(authMiddleware, checkOwnership, usersController.deleteUser);


export default userRouter;