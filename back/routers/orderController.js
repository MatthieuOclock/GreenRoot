import sequelize from "../database.js";
import Order from "../data/models/order.js";
import Tree from "../data/models/tree.js";
//const stripe = require('stripe')('sk_test_51PM77gHRY0RGHhfcuMQermEM6MJB2UklTup1slR0PWHw5XylnxZvtTiY5IL4i4EVDm8HeUSSKp4kKewFpjHfg8jf007ZkdH3IE');
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PM77gHRY0RGHhfcuMQermEM6MJB2UklTup1slR0PWHw5XylnxZvtTiY5IL4i4EVDm8HeUSSKp4kKewFpjHfg8jf007ZkdH3IE');


const order = {

    async list(req, res) {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            const response = await Order.findAll();
            console.log(response);
            res.json(response);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },

    async findOrderById(req, res) {
        try {
            const orderId = req.params.id;
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: "Utilisateur non trouvé" })
            };
            res.json(order);
        } catch (error) {
            console.log(error);
        }
    },

    async addNewOrder(req, res) {
        try {
            console.log('Données reçues pour l\'insertion :', req.body);

            const { order_date, status, total, plantation_date, tree_id, user_id } = req.body;
            const treeIds = tree_id.split(',');


            const orders = await Promise.all(treeIds.map(async (treeId) => {
                return await Order.create({
                    order_date,
                    status,
                    total: total / treeIds.length,
                    plantation_date,
                    tree_id: treeId,
                    user_id,
                });
            }));

            console.log('Commandes créées :', orders);

            res.status(201).json(orders);
        } catch (error) {
            console.error('Erreur lors de la création des commandes :', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    },


    async updateOrder(req, res) {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' })
        }
        const updateOrder = await order.update(req.body);
        res.json(updateOrder);
    },

    async deleteOrder(req, res) {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' })
        }

        const deleteOrder = await order.destroy(req.body);
        res.json(deleteOrder);
    },

    async stripeFunctionPost(req, res) {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: Tree.price,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${process.env.URL_API}return?session_id={CHECKOUT_SESSION_ID}`,
        });

        res.send({ clientSecret: session.client_secret });
    },

    async stripeFunctionGet(req, res) {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

        res.send({
            status: session.status,
            customer_email: session.customer_details.email
        })
    }
}

export default order;