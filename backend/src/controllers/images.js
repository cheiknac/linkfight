import Images from '../models/images.js';
import Sportprofil from '../models/Sportprofil.js';

const MAX_IMAGES = 6;

const imagesController = {
    // Get all images for the connected user's sport profile
    async getMyImages(req, res) {
        try {
            const images = await Images.findAll({
                where: { id_sportprofil: req.user.id },
            });
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

    // Upload a new image (Cloudinary) for the connected user
    async uploadImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Aucun fichier reçu.' });
            }

            const sportprofil = await Sportprofil.findByPk(req.user.id);
            if (!sportprofil) {
                return res.status(400).json({ message: "Tu dois d'abord remplir ton profil sportif." });
            }

            const count = await Images.count({ where: { id_sportprofil: req.user.id } });
            if (count >= MAX_IMAGES) {
                return res.status(400).json({ message: `Maximum ${MAX_IMAGES} images atteintes.` });
            }

            const createdImage = await Images.create({
                id_sportprofil: req.user.id,
                url: req.file.path,
            });

            res.status(201).json({
                success: true,
                data: createdImage,
            });
        } catch (error) {
            console.error("Erreur lors de la création de l'image:", error);
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la création de l'image.",
            });
        }
    },

    // Delete an image (only if it belongs to the connected user)
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

            if (image.id_sportprofil !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Vous n'êtes pas autorisé à supprimer cette image.",
                });
            }

            await image.destroy();

            res.status(200).json({
                success: true,
                message: 'Image supprimée avec succès.',
            });
        } catch (error) {
            console.error("Erreur lors de la suppression de l'image:", error);
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de la suppression de l'image.",
            });
        }
    },
};

export default imagesController;