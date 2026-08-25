import Palmares from "../models/palmares.js";
import Sportprofil from "../models/Sportprofil.js";

const palmaresController = {
    // Get all palmares for the connected user's sport profile
    async getMyPalmares(req, res) {
        try {
            const palmares = await Palmares.findAll({
                where: { id_sportprofil: req.user.id },
            });
            res.status(200).json({
                success: true,
                count: palmares.length,
                data: palmares,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération des palmarès.',
            });
        }
    },

    // Create a new palmares for the connected user
    async createPalmares(req, res) {
        try {
            const { title, discipline, city, country, date, result } = req.body;

            const sportprofil = await Sportprofil.findByPk(req.user.id);
            if (!sportprofil) {
                return res.status(400).json({
                    success: false,
                    message: "Tu dois d'abord remplir ton profil sportif.",
                });
            }

            const createdPalmares = await Palmares.create({
                id_sportprofil: req.user.id,
                title,
                discipline,
                city,
                country,
                date,
                result,
            });

            res.status(201).json({
                success: true,
                data: createdPalmares,
                message: 'Palmarès créé avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la création du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la création du palmarès.',
            });
        }
    },

    // Update a palmares by ID (only if it belongs to the connected user)
    async updatePalmares(req, res) {
        try {
            const { id } = req.params;
            const { title, discipline, city, country, date, result } = req.body;

            const palmares = await Palmares.findByPk(id);

            if (!palmares) {
                return res.status(404).json({
                    success: false,
                    message: 'Palmarès non trouvé.',
                });
            }

            if (palmares.id_sportprofil !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Vous n'êtes pas autorisé à modifier ce palmarès.",
                });
            }

            palmares.title = title ?? palmares.title;
            palmares.discipline = discipline ?? palmares.discipline;
            palmares.city = city ?? palmares.city;
            palmares.country = country ?? palmares.country;
            palmares.date = date ?? palmares.date;
            palmares.result = result ?? palmares.result;

            await palmares.save();

            res.status(200).json({
                success: true,
                data: palmares,
                message: 'Palmarès mis à jour avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour du palmarès.',
            });
        }
    },

    // Delete a palmares by ID (only if it belongs to the connected user)
    async deletePalmares(req, res) {
        try {
            const { id } = req.params;

            const palmares = await Palmares.findByPk(id);

            if (!palmares) {
                return res.status(404).json({
                    success: false,
                    message: 'Palmarès non trouvé.',
                });
            }

            if (palmares.id_sportprofil !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Vous n'êtes pas autorisé à supprimer ce palmarès.",
                });
            }

            await palmares.destroy();

            res.status(200).json({
                success: true,
                message: 'Palmarès supprimé avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression du palmarès.',
            });
        }
    },
};

export default palmaresController;