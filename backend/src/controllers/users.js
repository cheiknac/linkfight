import Users from "../models/users.js";
import argon2 from "argon2";


/* show all users */

const usersController = {

    async getAllUsers (req, res) {

    try {
        const users = await Users.findAll();

        res.status(200).json({
            succes: true,
            count: users.length,
            data: users,
        });
    } catch(error) {
        console.error('Erreur lors de la récupération des utilisateur:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération des utilisateurs.',
        })
    }
  },

  // Select user by id

  async getUserById (req, res) {
    try {
        const user = await Users.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé.',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch(error) {
        console.error('Erreur lors de la récupération de l utilisateur:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération de l utilisateur.',
        })
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const {
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
        where: { email },
      });

      if (userExists) {
        return res.status(409).json({
          success: false,
          message: "Cet email existe déjà.",
        });
      }

      const hashedPassword = await argon2.hash(password);

      const createdUser = await Users.create({
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
      });

      const userWithoutPassword = createdUser.toJSON();
      delete userWithoutPassword.password;

      res.status(201).json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création.",
      });
    }
  },  

  // Update user by id
   async updateUser(req, res) {
    try {
      const user = await Users.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé.",
        });
      }

      const data = { ...req.body };

      // Hasher le mot de passe uniquement s'il est fourni
      if (data.password) {
        data.password = await argon2.hash(data.password);
      }

      // Vérifier l'email s'il change
      if (data.email) {
        const emailExists = await Users.findOne({
          where: { email: data.email },
        });

        if (emailExists && emailExists.id !== user.id) {
          return res.status(409).json({
            success: false,
            message: "Cet email est déjà utilisé.",
          });
        }
      }

      await user.update(data);

      const updatedUser = user.toJSON();
      delete updatedUser.password;

      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour.",
      });
    }
  },


  // Delete user by id
    async deleteUser(req, res) {
    try {
      const user = await Users.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé.",
        });
      }

      await user.destroy();

      res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression.",
      });
    }
  },
 

};

export default usersController;