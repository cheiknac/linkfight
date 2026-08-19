const checkOwnership = (req, res, next) => {
    const { id } = req.params;

    if (parseInt(id, 10) !== req.user.id) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
    }

    next();
};

export default checkOwnership;