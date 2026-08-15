import Palmares from "../models/palmares.js";

const palmaresController = {
    // Get all palmares
    async getAllPalmares(req, res) {
        try {
            const palmares = await Palmares.findAll();
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

    // Get palmares by id
    async getPalmaresById(req, res) {
        try {
            const palmares = await Palmares.findByPk(req.params.id);

            if (!palmares) {
                return res.status(404).json({
                    success: false,
                    message: 'Palmarès non trouvé.',
                });
            }

            res.status(200).json({
                success: true,
                data: palmares,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération du palmarès.',
            });
        }
    },

    // Create a new palmares
    async createPalmares(req, res) {
        try {
            const { title, discipline, city, country, date, result } = req.body;

            const createdPalmares = await Palmares.create({
                title,
                discipline,
                city,
                country,
                date,
                result
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

    // Update a palmares by ID
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

            palmares.title = title || palmares.title;
            palmares.discipline = discipline || palmares.discipline;
            palmares.city = city || palmares.city;
            palmares.country = country || palmares.country;
            palmares.date = date || palmares.date;
            palmares.result = result || palmares.result;

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

    // Delete a palmares by ID
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