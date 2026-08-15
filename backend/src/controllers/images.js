import Images from '../models/images.js';

const imagesController = {
    // Get all images
    async getAllImages(req, res) {
        try {
            const images = await Images.findAll();
            res.status(200).json({
                success: true,
                count: images.length,
                data: images,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des images:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération des images.',
            });
        }
    },

    // Get image by id
    async getImageById(req, res) {
        try {
            const image = await Images.findByPk(req.params.id);

            if (!image) {
                return res.status(404).json({
                    success: false,
                    message: 'Image non trouvée.',
                });
            }

            res.status(200).json({
                success: true,
                data: image,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'image:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération de l\'image.',
            });
        }
    },

    // Create a new image
    async createImage(req, res) {
        try {
            const { id_user, image_url, description } = req.body;

            const createdImage = await Images.create({
                url: image_url,
            });

            res.status(201).json({
                success: true,
                data: createdImage,
            });
        } catch (error) {
            console.error('Erreur lors de la création de l\'image:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la création de l\'image.',
            });
        }
    },

    // Update an image
    async updateImage(req, res) {
        try {
            const { id } = req.params;
            const { image_url, description } = req.body;

            const image = await Images.findByPk(id);

            if (!image) {
                return res.status(404).json({
                    success: false,
                    message: 'Image non trouvée.',
                });
            }

            await image.update({
                url: image_url,
            });

            res.status(200).json({
                success: true,
                data: image,
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'image:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour de l\'image.',
            });
        }
    },

    // Delete an image
    async deleteImage(req, res) {
        try {
            const { id } = req.params;

            const image = await Images.findByPk(id);

            if (!image) {
                return res.status(404).json({
                    success: false,
                    message: 'Image non trouvée.',
                });
            }

            await image.destroy();

            res.status(200).json({
                success: true,
                message: 'Image supprimée avec succès.',
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image:', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression de l\'image.',
            });
        }
    },  
};


export default imagesController;