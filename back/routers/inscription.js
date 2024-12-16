import express from "express";
import addUser from "../data/recupData/recupUser/addUser.js";

const route = express.Router();
const reponse = []; // Variable de test pour stocker temporairement les utilisateurs

route.post("/", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            role,
            password
        } = req.body;

        // Validation des champs
        if (!firstName || !lastName || !email || !phone || !role || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        // Ajouter l'utilisateur à la liste temporaire
        reponse.push({ firstName, lastName, email, phone, role, password });

        // Enregistrer l'utilisateur en base de données
        await addUser(firstName, lastName, email, phone, role, password);

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
});
//a
// Endpoint pour récupérer la liste des utilisateurs (pour les tests uniquement)
route.get("/inscription", (req, res) => {
    res.json({ user: reponse });
});

export default route;