import Sportprofil from "../models/Sportprofil.js";
import Palmares from "../models/palmares.js";
import Images from "../models/images.js";

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
            const { id_user, sport_name, position, phone, website } = req.body;

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
                disciplin,
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
};

export default sportprofilController;