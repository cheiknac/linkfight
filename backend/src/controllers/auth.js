import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Users from '../models/users.js';

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await Users.create({
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(201).json({ message: 'Utilisateur créé avec succès', token });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }


      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },
};

export default authController;