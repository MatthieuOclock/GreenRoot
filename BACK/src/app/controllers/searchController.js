import { Op } from 'sequelize';
import Tree from '../models/Tree.js';
import Campain from '../models/Campain.js';

const searchController = {
    async search(req, res) {
        const query = req.query.q;

        try {
            const [treeResults, campainResults] = await Promise.all([
                Tree.findAll({
                    where: {
                        race: { [Op.iLike]: `%${query}%` }
                    }
                }),
                Campain.findAll({
                    where: {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${query}%` } },
                            { place: { [Op.iLike]: `%${query}%` } }
                        ]
                    }
                }),
            ]);

            const formattedResults = [
                ...treeResults.map(tree => ({
                    id: tree.id,
                    name: tree.race,
                    place: '',
                    type: 'tree',
                    price: tree.price,
                    description: tree.description,
                    picture: tree.picture
                })),
                ...campainResults.map(campain => ({
                    id: campain.id,
                    name: campain.name,
                    place: campain.place,
                    type: 'campain',
                    date_begin: campain.date_begin,
                    date_end: campain.date_end,
                    picture: campain.picture
                }))
            ];

            res.json(formattedResults);
        } catch (error) {
            console.error('Error during search:', error);
            res.status(500).json({ message: 'Erreur lors de la recherche', error: error.message });
        }
    }
};

export default searchController;
