import Users from "../models/users.js";
import Sportprofil from "../models/Sportprofil.js";
import Sponsor from "../models/Sponsor.js";
import Media from "../models/Media.js";

import argon2 from "argon2";
import slugify from "slugify";

// Génère un slug unique en ajoutant un suffixe numérique si besoin
async function generateUniqueSlug(firstname, lastname) {
    const base = slugify(`${firstname} ${lastname}`, { lower: true, strict: true });
    let slug = base;
    let counter = 1;

    while (await Users.findOne({ where: { slug } })) {
        slug = `${base}-${counter}`;
        counter++;
    }

    return slug;
}

// Show all users 
const UsersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.findAll({
        include: [{ model: Sportprofil }, { model: Sponsor }, { model: Media }],
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur du serveur interne" });
    }
  },

  // Show users by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Users.findByPk(id, {
        include: [{ model: Sportprofil }, { model: Sponsor }, { model: Media }],
      });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur du serveur interne" });
    }
  },

  // Show a public profile by slug
  getUserBySlug: async (req, res) => {
    const { slug } = req.params;
    try {
      const user = await Users.findOne({
        where: { slug },
        include: [{ model: Sportprofil }, { model: Sponsor }, { model: Media }],
      });

      if (!user) {
        return res.status(404).json({ message: "Profil introuvable" });
      }

      const { password, email, ...publicProfile } = user.toJSON();

      res.status(200).json(publicProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur du serveur interne" });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        type,
        birthday,
        address,
        zip_code,
        city,
        avatar,
        legals,
      } = req.body;

      const userExists = await Users.findOne({
        where: { email: email },
      });

      if (userExists) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà." });
      }

      const hashedPassword = await argon2.hash(password);
      const slug = await generateUniqueSlug(firstname, lastname);

      const newUser = await Users.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        type,
        birthday,
        address,
        zip_code,
        city,
        avatar,
        legals,
        slug,
      });

      const { password: _password, ...userWithoutPassword } = newUser.toJSON();

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur du serveur interne" });
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { password, address, zip_code, city, avatar } = req.body;

    try {
      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      if (password) {
        user.password = await argon2.hash(password);
      }
      user.address = address || user.address;
      user.zip_code = zip_code || user.zip_code;
      user.city = city || user.city;
      user.avatar = avatar || user.avatar;

      await user.save();

      const { password: _password, ...userWithoutPassword } = user.toJSON();

      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur du serveur interne" });
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {

      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      await user.destroy();
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {

      console.error(error);
      res.status(500).json({ message: "Erreur du serveur interne" });
    }
  },

};

export default UsersController;