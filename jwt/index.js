import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware pour parser le corps des requêtes
app.use(bodyParser.json());

// Clé secrète pour signer les JWT
const SECRET_KEY = 'ma_super_cle_secrete';

// Route de connexion : génère un token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Exemple simplifié de validation (à adapter à ton projet)
    if (username === 'admin' && password === 'password') {
        // Générer un token avec des données utilisateur
        const token = jwt.sign(
            { username }, // Charge utile (payload)
            SECRET_KEY,  // Clé secrète
            { expiresIn: '1h' } // Expiration (1 heure)
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
});

// Middleware pour vérifier les JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) return res.sendStatus(401); // Pas de token

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Token invalide
        req.user = user; // Ajouter l'utilisateur vérifié à la requête
        next();
    });
};

// Route protégée
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Bienvenue, ${req.user.username}` });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});