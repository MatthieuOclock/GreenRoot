import validator from 'validator';
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import userController from "../controllers/userController.js";
import jwt from 'jsonwebtoken';

const authController = {
    // méthode pour hacher un mot de passe
    hash: async function (password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        } catch (error) {
            console.error("Erreur lors du hachage du mot de passe :", error);
            throw new Error("Erreur lors du hachage du mot de passe.");
        }
    },

    // méthode pour enregistrer un nouvel utilisateur
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            const userExists = await User.findOne({ where: { email: email } });

            if (userExists) {
                return res.status(400).json({ message: 'L\'e-mail est déjà associé à un compte' });
            }

            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

            if (!validator.isStrongPassword(password, options)) {
                return res.status(400).json({
                    message: 'Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial'
                });
            }

            const newUser = await userController.addNewUser(req);
            res?.status(201)?.json({ message: 'Inscription Réussie', user: newUser });
        } catch (error) {
            res.status(401).json({ message: 'Une erreur est survenue lors de l\'inscription', error: error.message });
        }
    },

    // méthode pour connecter un utilisateur
    login: async function (req, res) {
        try {
            const { email, password } = req.body;

            const foundUser = await User.findOne({ where: { email } });

            if (!foundUser) {
                return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
            }

            const isPasswordValid = await bcrypt.compare(password, foundUser.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
            }

            const jwtToken = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('access_token', jwtToken, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });

            req.session.isLogged = true;
            req.session.email = foundUser.email;

            res.status(200).json({ message: 'Authentification réussie', user: foundUser, token: jwtToken, userId: User.id });
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la connexion:', error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion.' });
        }
    },


    // méthode pour déconnecter un utilisateur
    logout: (req, res) => {
        try {
            console.log('Tentative de déconnexion...');
            res.clearCookie('access_token', { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
            console.log('Cookie access_token supprimé');

            req.session.destroy((err) => {
                if (err) {
                    console.error('Erreur lors de la destruction de la session:', err);
                    return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
                }
                console.log('Session détruite');
                res.clearCookie('connect.sid', { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
                console.log('Cookie connect.sid supprimé');
                res.status(200).json({ message: 'Déconnexion réussie' });
            });
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion.' });
        }
    }
};

export default authController;
