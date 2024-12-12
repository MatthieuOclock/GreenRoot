import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database.js';

class Campain extends Model { }

Campain.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // dans le premier objet on liste notre propriétés à qui on associe un objet de configuration
    name: {
        // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
        type: DataTypes.TEXT, // on configure un type
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ 
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    place: {
        type: DataTypes.TEXT,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    date_begin: {
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
    date_end: {
        // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
        type: DataTypes.DATE, // on configure un type
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ 
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter

            isDate: true,
        },
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        references: {
            model: 'user',
            key: 'id'
        }
    },

}, { // dans le 2ème objet on dit dans quelle bdd devront persister les infos
    sequelize, // pour cela on indique le client connecté à la bdd
    modelName: 'Campain', // on donne un nom au modèle, cela pourra servir plus tard
    tableName: 'campain', // on peut demander à sequelize de ranger les infos liées à ce modèle dans la table de notre choix
    timestamps: false,

});

export default Campain;