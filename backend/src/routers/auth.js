import { Router } from 'express';
import authController from '../controllers/auth.js';

const authRouter = Router();

// Route pour l'inscription
authRouter.post('/register', authController.register);

// Route pour la connexion
authRouter.post('/login', authController.login);

export default authRouter;