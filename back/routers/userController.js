import sequelize from "../database.js";
import User from "../data/models/user.js";
// import Tree from "../models/Tree.js";
import Order from "../data/models/order.js";
import bcrypt from 'bcrypt';
import authController from "./authController.js";
import Tree from "../data/models/tree.js";

const user = {
    // méthode pour lister tous les utilisateurs
    async list(req, res) {
        try {
            await sequelize.authenticate(); // authentification à la bdd
            console.log('Connection has been established successfully.');
            const response = await User.findAll(); // récupération de tous les utilisateurs
            res.json(response); // envoi de la liste des utilisateurs en json
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // méthode pour trouver un utilisateur via son ID
    async findUserById(req, res) {
        try {
            const userId = req.params.id; // récupération de l'id de la requête
            const user = await User.findByPk(userId); // recherche de l'utilisateur par son ID
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" }); // retourne une erreur si l'utilisateur n'est pas trouvé
            }
            return res.json(user); // retourne l'utilisateur trouvé
        } catch (error) {
            console.error('Error finding user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // méthode pour obtenir les informations de l'utilisateur connecté
    async getMe(req, res) {
        try {
            const userId = req.user.id;// Récupérer l'id de l'utilisateur connecté
            console.log(userId,"ok");
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            return res.json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Méthode pour obtenir les arbres de l'utilisateur connecté
    async getUserTrees(req, res) {
        try {
            const userId = req.user.id; // Récupérer l'id de l'utilisateur connecté
            console.log(userId);
            const trees = await Order.findAll({ where: { user_id: userId } });
            if (!user) {
                return res.status(404).json({ message: "Commande non trouvé" });
            }
            return res.json(trees);
        } catch (error) {
            console.error('Error getting user trees:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async getUserOrders(req, res) {
        try {
            const userId = req.user.id;
            console.log(userId);
            const order = await Order.findAll({ where: { user_id: userId } }); //une liste de commande d'un user
            if (!user || user.length === 0) {
                return res.status(404).json({ message: "Commande non trouvé" });
            }

            const command_user = [];

            for (const command of order) {
                const tree = await Tree.findAll({ where: { id: command.tree_id } });
                if (!tree || tree.length === 0) {
                    return res.status(404).json({ message: "Tree non trouvé" });
                }

                command_user.push(tree[0].dataValues);
            };
            return res.json(command_user);
        } catch (error) {
            console.error('Error getting user trees:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // méthode pour ajouter un nouvel utilisateur
    async addNewUser(req, res) {
        try {
            // récupération des informations utilisateur depuis la requête 
            const { first_name, last_name, email, phone, role, password } = req.body;

            // vérification que toutes les informations demandées sont fournies
            if (!first_name || !last_name || !email || !phone || !role || !password) {
                throw new Error('Toutes les informations nécessaires doivent être fournies.');
            }

            // hachage du mot de passe via la méthode hash stockée dans notre authController
            const hashedPassword = await authController.hash(password);

            const newUser = await User.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                role: 'user', // Fixe
                password: hashedPassword, // stockage du mot de passe haché
            });

            return res?.status(201)?.json(newUser); // retourne le nouvel utilisateur créé
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // méthode pour mettre à jour un utilisateur
    async updateUser(req, res) {
        const userId = req.params.id; // récupération de l'id de la requête

        const { password, ...otherPassword } = req.body;

        const user = await User.findByPk(userId); // recherche de l'utilisateur par son ID
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' }); // retourne une erreur si l'utilisateur n'est pas trouvé
        }

        if (password) {
            const isPasswordValid = await bcrypt.compare(password, user.password); // compare le nouveau password avec l'ancien

            if (isPasswordValid) {
                return res.status(400).json({ message: `Le mot de passe doit être différent de l'ancien!` }); // retourne une erreur si c'est le même password
            }
        }

        const hashedPassword = password ? await authController.hash(password) : user.password; // hachage du nouveau mot de passe 

        // mise à jour des informations utilisateur
        const updateUser = await user.update({ ...otherPassword, password: hashedPassword });
        if (updateUser) {
            return res.status(200).json({ message: 'Modification a bien été mise à jour', user: updateUser }); // retourne une réponse de succès 
        } else {
            return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour' }); // retourne une erreur
        }
    },

    // méthode pour supprimer un utilisateur
    async deleteUser(req, res) {
        const userId = req.params.id; // récupération de l'id de la requête
        const user = await User.findByPk(userId); // recherche de l'utilisateur par son ID

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' }); // retourne une erreur si l'utilisateur n'est pas trouvé
        }

        // suppression de l'utilisateur
        const deleteUser = await user.destroy();
        res.json({ message: 'Utilisateur supprimé', user: deleteUser });
    }
};

export default user;