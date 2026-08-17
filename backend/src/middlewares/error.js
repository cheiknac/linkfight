// Middleware pour la gestion des erreurs
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur', error: err.message });
};

// Middleware pour les routes non trouvées
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
};

export { errorMiddleware, notFoundMiddleware };
