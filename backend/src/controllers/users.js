import Users from "../models/users.js";
import Sportprofil from "../models/Sportprofil.js";
import Sponsor from "../models/Sponsor.js";
import Media from "../models/Media.js";

import argon2 from "argon2";

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

      // Create a new user
      createUser: async (req, res) => {
        const { id, email, password } = req.body;
        try {
          const hashedPassword = await argon2.hash(password);
          const newUser = await Users.create({ 
            id,
            email, 
            password: hashedPassword
           });
          res.status(201).json(newUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erreur du serveur interne" });
        }

        const { password: undefined, ...userWithoutPassword } = createdUser.toJSON();
        
        res.status(201).json(userWithoutPassword);
      },

      // Update a user by ID
      updateUser: async (req, res) => {
        const { id } = req.params;
        const { email, password } = req.body;
        try {
          const user = await Users.findByPk(id);
          if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
          }
          user.email = email || user.email;
          user.password = password || user.password;
          await user.save();
          res.status(200).json(user);
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