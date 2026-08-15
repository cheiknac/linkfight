import Palmares from "../models/palmares";

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
        } catch(error) {
            console.error('Erreur lors de la récupération des palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération des palmarès.',
            })
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
        } catch(error) {
            console.error('Erreur lors de la récupération du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération du palmarès.',
            })
        }
    },

    // Create a new palmares
    async createPalmares(req, res) {
        try {
            const { id_sportprofil, title, discipline, city, country, date, result } = req.body;

            const createdPalmares = await Palmares.create({
                id_sportprofil,
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
            });
        } catch(error) {
            console.error('Erreur lors de la création du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la création du palmarès.',
            })
        }
    },

    // Update a palmares
    async updatePalmares(req, res) {
        try {
            const { id } = req.params;
            const { id_sportprofil, title, discipline, city, country, date, result } = req.body;

            const palmares = await Palmares.findByPk(id);

            if (!palmares) {
                return res.status(404).json({
                    success: false,
                    message: 'Palmarès non trouvé.',
                });
            }

            await palmares.update({
                id_sportprofil,
                title,
                discipline,
                city,
                country,
                date,
                result,
            });

            res.status(200).json({
                success: true,
                data: palmares,
            });
        } catch(error) {
            console.error('Erreur lors de la mise à jour du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour du palmarès.',
            })
        }
    },

    // Delete a palmares
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
        } catch(error) {
            console.error('Erreur lors de la suppression du palmarès:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression du palmarès.',
            })
        }
    },


};


export default palmaresController;