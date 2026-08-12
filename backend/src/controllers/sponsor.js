import Sponsor from "../models/sponsor.js";

const sponsorController = {

    // show all sponsors
    async getAllSponsors (req, res) {
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

};


export default sponsorController;
