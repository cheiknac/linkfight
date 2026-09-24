import pkg from "sequelize";
const { Op } = pkg;
import Sportprofil from "../models/Sportprofil.js";
import Palmares from "../models/palmares.js";
import Images from "../models/images.js";
import Users from "../models/users.js";

const sportprofilController = {
    // Get all sport profiles
    async getAllSportprofils(req, res) {
        try {
            const sportprofils = await Sportprofil.findAll({
                include: [{ model: Palmares }, { model: Images }],
            });

            res.status(200).json({
                success: true,
                count: sportprofils.length,
                data: sportprofils,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des profils sportifs:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération des profils sportifs.',
            });
        }
    },

    // Search sport profiles with filters
    async searchSportprofils(req, res) {
        try {
            const {
                name,
                discipline,
                club,
                weightMin,
                weightMax,
                victoryMin,
                defeatMax,
            } = req.query;

            const sportprofilWhere = {};

            if (discipline) {
                sportprofilWhere.discipline = { [Op.iLike]: `%${discipline}%` };
            }

            if (club) {
                sportprofilWhere.club = { [Op.iLike]: `%${club}%` };
            }

            if (weightMin || weightMax) {
                sportprofilWhere.weight = {};
                if (weightMin) sportprofilWhere.weight[Op.gte] = parseFloat(weightMin);
                if (weightMax) sportprofilWhere.weight[Op.lte] = parseFloat(weightMax);
            }

            if (victoryMin) {
                sportprofilWhere.victory = { [Op.gte]: parseInt(victoryMin, 10) };
            }

            if (defeatMax) {
                sportprofilWhere.defeat = { [Op.lte]: parseInt(defeatMax, 10) };
            }

            const usersWhere = {};

            if (name) {
                usersWhere[Op.or] = [
                    { firstname: { [Op.iLike]: `%${name}%` } },
                    { lastname: { [Op.iLike]: `%${name}%` } },
                ];
            }

            const sportprofils = await Sportprofil.findAll({
                where: sportprofilWhere,
                include: [
                    {
                        model: Users,
                        where: Object.keys(usersWhere).length ? usersWhere : undefined,
                        attributes: ["id", "firstname", "lastname", "avatar"],
                    },
                ],
            });

            res.status(200).json({
                success: true,
                count: sportprofils.length,
                data: sportprofils,
            });
        } catch (error) {
            console.error('Erreur lors de la recherche des profils sportifs:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la recherche des profils sportifs.',
            });
        }
    },

    // Get sport profile by id
    async getSportprofilById(req, res) {
        try {
            const sportprofil = await Sportprofil.findByPk(req.params.id, {
                include: [{ model: Palmares }, { model: Images }],
            });

            if (!sportprofil) {
                return res.status(404).json({
                    success: false,
                    message: 'Profil sportif non trouvé.',
                });
            }

            res.status(200).json({
                success: true,
                data: sportprofil,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du profil sportif:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération du profil sportif.',
            });
        }
    },

    // Create a new sport profile
    async createSportprofil(req, res) {
        try {
            const { biography, categorie, discipline, club, zipcode_club, victory, defeat, weight, instagram, tiktok, snapchat } = req.body;

            const createdSportprofil = await Sportprofil.create({
                biography,
                categorie,
                discipline,
                club,
                zipcode_club,
                victory,
                defeat,
                weight,
                instagram,
                tiktok,
                snapchat,
            });

            res.status(201).json({
                success: true,
                data: createdSportprofil,
            });
        } catch (error) {
            console.error('Erreur lors de la création du profil sportif:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la création du profil sportif.',
            });
        }
    },

    // Update a sport profile by ID
    async updateSportprofil(req, res) {
        try {
            const { id } = req.params;
            const { 
                biography, 
                categorie,
                discipline,
                club,
                zipcode_club,
                victory,
                defeat,
                weight,
                instagram,
                tiktok,
                snapchat
            } = req.body;

            const sportprofil = await Sportprofil.findByPk(id);
            if (!sportprofil) {
                return res.status(404).json({
                    success: false,
                    message: 'Profil sportif non trouvé.',
                });
            }

            sportprofil.biography = biography || sportprofil.biography;
            sportprofil.categorie = categorie || sportprofil.categorie;
            sportprofil.discipline = discipline || sportprofil.discipline;
            sportprofil.club = club || sportprofil.club;
            sportprofil.zipcode_club = zipcode_club || sportprofil.zipcode_club;
            sportprofil.victory = victory || sportprofil.victory;
            sportprofil.defeat = defeat || sportprofil.defeat;
            sportprofil.weight = weight || sportprofil.weight;
            sportprofil.instagram = instagram || sportprofil.instagram;
            sportprofil.tiktok = tiktok || sportprofil.tiktok;
            sportprofil.snapchat = snapchat || sportprofil.snapchat;

            await sportprofil.save();

            res.status(200).json({
                success: true,
                data: sportprofil,
                message: 'Profil sportif mis à jour avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil sportif:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour du profil sportif.',
            });
        }
    },

    // Delete a sport profile by ID
    async deleteSportprofil(req, res) {
        try {
            const { id } = req.params;

            const sportprofil = await Sportprofil.findByPk(id);
            if (!sportprofil) {
                return res.status(404).json({
                    success: false,
                    message: 'Profil sportif non trouvé.',
                });
            }

            await sportprofil.destroy();

            res.status(200).json({
                success: true,
                message: 'Profil sportif supprimé avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du profil sportif:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression du profil sportif.',
            });
        }
    },

    // Get my own sport profile
    async getMySportprofil(req, res) {
        try {
            const sportprofil = await Sportprofil.findByPk(req.user.id, {
                include: [{ model: Palmares }, { model: Images }],
            });

            res.status(200).json({
                success: true,
                data: sportprofil, // peut être null si pas encore créé
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du profil sportif:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur.',
            });
        }
    },

    // Create or update my own sport profile
    async upsertMySportprofil(req, res) {
        try {
            const userId = req.user.id;
            const {
                biography,
                categorie,
                discipline,
                club,
                zipcode_club,
                victory,
                defeat,
                weight,
                instagram,
                tiktok,
                snapchat,
            } = req.body;

            let sportprofil = await Sportprofil.findByPk(userId);

            if (!sportprofil) {
                sportprofil = await Sportprofil.create({
                    id: userId,
                    biography,
                    categorie,
                    discipline,
                    club,
                    zipcode_club,
                    victory,
                    defeat,
                    weight,
                    instagram,
                    tiktok,
                    snapchat,
                });
            } else {
                sportprofil.biography = biography ?? sportprofil.biography;
                sportprofil.categorie = categorie ?? sportprofil.categorie;
                sportprofil.discipline = discipline ?? sportprofil.discipline;
                sportprofil.club = club ?? sportprofil.club;
                sportprofil.zipcode_club = zipcode_club ?? sportprofil.zipcode_club;
                sportprofil.victory = victory ?? sportprofil.victory;
                sportprofil.defeat = defeat ?? sportprofil.defeat;
                sportprofil.weight = weight ?? sportprofil.weight;
                sportprofil.instagram = instagram ?? sportprofil.instagram;
                sportprofil.tiktok = tiktok ?? sportprofil.tiktok;
                sportprofil.snapchat = snapchat ?? sportprofil.snapchat;

                await sportprofil.save();
            }

            res.status(200).json({
                success: true,
                data: sportprofil,
                message: 'Profil sportif enregistré avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil sportif:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur.',
            });
        }
    },
};

export default sportprofilController;