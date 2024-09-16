import sequelize from "../../db/database.js";
import Tree from "../models/Tree.js";

const tree = {

    async list(req, res) {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            const response = await Tree.findAll();
            res.json(response);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },


    async findTreeById(req, res) {
        try {
            const treeId = req.params.id;
            const tree = await Tree.findByPk(treeId);
            if (!tree) {
                return res.status(404).json({ message: "Arbres non trouvé" })
            };
            res.json(tree);
        } catch (error) {
            console.log(error);
        }
    },
    async addNewTree(req, res) {
        const user_id = req.user.id;
        const treeData = {
            ...req.body,
            user_id: user_id
        };
        const newTree = await Tree.create(treeData)
        res.json(newTree);
    },

    async updateTree(req, res) {
        const treeId = req.params.id; //Germain le bogoss
        const tree = await Tree.findByPk(treeId)
        if (!tree) {
            return res.status(404).json({ message: 'Arbre non trouvé' })
        }
        const updateTree = await tree.update(req.body);
        res.json(updateTree);
    },

    async deleteTree(req, res) {
        const treeId = req.params.id;
        const tree = await Tree.findByPk(treeId)
        if (!tree) {
            return res.status(404).json({ message: 'Arbre non trouvé' })
        }

        const deleteTree = await tree.destroy(req.body);
        res.json(deleteTree);
    }
}

export default tree;