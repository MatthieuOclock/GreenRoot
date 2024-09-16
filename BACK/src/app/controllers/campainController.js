import sequelize from "../../db/database.js";
// import User from "../models/User.js";
import Campain from "../models/Campain.js";
// import Order from "../models/Order.js";
// import Tree from "../models/Tree.js";

const campain = {

    async list(req, res) {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            const response = await Campain.findAll();
            res.json(response);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },

    async findCampainById(req, res) {
        try {
            const campainId = req.params.id;
            const campain = await Campain.findByPk(campainId);
            if (!campain) {
                return res.status(404).json({ message: "Campagne non trouvé" })
            };
            res.json(campain);
        } catch (error) {
            console.log(error);
        }
    },

    async addNewCampain(req, res) {
        const user_id = req.user.id;
        const campainData = {
            ...req.body,
            user_id: user_id
        };
        const newCampain = await Campain.create(campainData)
        res.json(newCampain);
    },

    async updateCampain(req, res) {
        const campainId = req.params.id;
        const campain = await Campain.findByPk(campainId)
        if (!campain) {
            return res.status(404).json({ message: 'Campagne non trouvée' })
        }
        const updateCampain = await campain.update(req.body);
        res.json(updateCampain);
    },

    async deleteCampain(req, res) {
        const campainId = req.params.id;
        const campain = await Campain.findByPk(campainId)
        if (!campain) {
            return res.status(404).json({ message: 'Campagne non trouvée' })
        }

        const deleteCampain = await campain.destroy(req.body);
        res.json(deleteCampain);
    }
}

export default campain;