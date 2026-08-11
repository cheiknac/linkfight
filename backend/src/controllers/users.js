import Users from "../models/users.js";


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
  }

};

export default usersController;