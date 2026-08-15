import Sponsor from "../models/sponsor.js";

const sponsorController = {
    // Get all sponsors
    async getAllSponsors(req, res) {
        try {
            const sponsors = await Sponsor.findAll();

            res.status(200).json({
                success: true,
                count: sponsors.length,
                data: sponsors,
            });
        } catch(error) {
            console.error('Erreur lors de la récupération des sponsors:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération des sponsors.',
            })
        }
    },

    // Get sponsor by id
    async getSponsorById(req, res) {
        try {
            const sponsor = await Sponsor.findByPk(req.params.id);
            
            if (!sponsor) {
                return res.status(404).json({
                    success: false,
                    message: 'Sponsor non trouvé.',
                });
            }

            res.status(200).json({
                success: true,
                data: sponsor,
            });
        } catch(error) {
            console.error('Erreur lors de la récupération du sponsor:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération du sponsor.',
            })
        }
    },

    // Create a new sponsor
    async createSponsor(req, res) {
        try {
            const { company_name, position, phone, website } = req.body;

            const createdSponsor = await Sponsor.create({
                company_name,
                position,
                phone,
                website
            });

            res.status(201).json({
                success: true,
                data: createdSponsor,
                message: 'Sponsor créé avec succès.',
            });
        } catch(error) {
            console.error('Erreur lors de la création du sponsor:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la création du sponsor.',
            })
        }
    },

    // Update a sponsor by id
    async updateSponsor(req, res) {
        try {
            const { id } = req.params;
            const { company_name, position, phone, website } = req.body;

            const sponsor = await Sponsor.findByPk(id);

            if (!sponsor) {
                return res.status(404).json({
                    success: false,
                    message: 'Sponsor non trouvé.',
                });
            }

            await sponsor.update({
                company_name,
                position,
                phone,
                website,
            });

            res.status(200).json({
                success: true,
                data: sponsor,
                message: 'Sponsor mis à jour avec succès.',
            });
        } catch(error) {
            console.error('Erreur lors de la mise à jour du sponsor:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour du sponsor.',
            })
        }
    },

    // Delete a sponsor by id
    async deleteSponsor(req, res) {
        try {
            const { id } = req.params;

            const sponsor = await Sponsor.findByPk(id);

            if (!sponsor) {
                return res.status(404).json({
                    success: false,
                    message: 'Sponsor non trouvé.',
                });
            }

            await sponsor.destroy();

            res.status(200).json({
                success: true,
                message: 'Sponsor supprimé avec succès.',
            });
        } catch(error) {
            console.error('Erreur lors de la suppression du sponsor:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression du sponsor.',
            })
        }
    },

};


export default sponsorController;
