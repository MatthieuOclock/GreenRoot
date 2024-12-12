import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';

class Order extends Model { }

Order.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // dans le premier objet on liste notre propriétés à qui on associe un objet de configuration
    order_date: {
        // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
        type: DataTypes.DATE, // on configure un type
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ 
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
            isDate: true,
        },
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),

        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    plantation_date: {
        type: DataTypes.DATE,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
            isDate: true,
        },
    },
    tree_id: {
        type: DataTypes.TEXT,
        allowNull: true, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        references: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            model: 'Tree',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        references: {
            model: 'User',
            key: 'id'
        }
    },

}, { // dans le 2ème objet on dit dans quelle bdd devront persister les infos
    sequelize, // pour cela on indique le client connecté à la bdd
    modelName: 'Order', // on donne un nom au modèle, cela pourra servir plus tard
    tableName: 'order', // on peut demander à sequelize de ranger les infos liées à ce modèle dans la table de notre choix
    timestamps: false,

});



export default Order;