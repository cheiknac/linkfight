import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Aucun jeton fourni' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé', error: error.message });
  }
};

export default authMiddleware;