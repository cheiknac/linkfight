import Media from "../models/media.js";

const mediaController = {
    // Show all media
    async getAllMedia(req, res) {
        try {
            const media = await Media.findAll();

            res.status(200).json({
                success: true,
                count: media.length,
                data: media,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des sponosors média:', error);
            res.status({
                success: false,
                message: 'Erreur serveur lors de la récupération des sponsors médias.',
            })
            .json({ message: 'Erreur du serveur interne' });
        }
    },

    // Show media by id
    async getMediaById(req, res) {
        try {
            const media = await Media.findByPk(req.params.id);

            if (!media) {
                return res.status(404).json({
                    success: false,
                    message: 'Média non trouvé.',
                });
            }

            res.status(200).json({
                success: true,
                data: media,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération du sponsor média:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération du sponsor média.',
            });
        }
    },

    // Create a new media
    async createMedia(req, res) {
        try {
            const { media_name, position, phone, website } = req.body;

            const createdMedia = await Media.create({
                media_name,
                position,
                phone,
                website,
            });

            res.status(201).json({
                success: true,
                data: createdMedia,
                message: "Sponsor média créé avec succès"
            });
        } catch (error) {
            console.error('Erreur lors de la création du sponsor média:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la création du sponsor média.',
            });
        }
    },

    // Update a media
    async updateMedia(req, res) {
        try {
            const { id } = req.params;
            const { media_name, position, phone, website } = req.body;

            const media = await Media.findByPk(id);

            if (!media) {
                return res.status(404).json({
                    success: false,
                    message: 'Sponsor média non trouvé.',
                });
            }

            await media.update({
                media_name,
                position,
                phone,
                website,
            });

            res.status(200).json({
                success: true,
                data: media,
                message: "Sponsor media modifié avec succès"
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du sponsor média:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour du sponsor média.',
            });
        }
    },

    // Delete a media
    async deleteMedia(req, res) {
        try {
            const { id } = req.params;

            const media = await Media.findByPk(id);

            if (!media) {
                return res.status(404).json({
                    success: false,
                    message: 'Sponsor média non trouvé.',
                });
            }

            await media.destroy();

            res.status(200).json({
                success: true,
                message: 'Sponsor média supprimé avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du sponsor média:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression du sponsor média.',
            });
        }
    },


};


export default mediaController;