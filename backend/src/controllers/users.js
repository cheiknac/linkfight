import Users from "../models/users.js";
import Sportprofil from "../models/Sportprofil.js";

const UsersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.findAll({
        include: [{ model: Sportprofil }],
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default UsersController;