const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class User extends Model { }



User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // dans le premier objet on liste notre propriétés à qui on associe un objet de configuration
    first_name: {
        // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
        type: DataTypes.TEXT, // on configure un type
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ 
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,

        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false, // on peut configurer des contraintes qui se mettront au niveau de la bdd
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators
        validate: { // en plus on peut mettre tout un tas de validateurs qui agiront au niveau des setter
            notEmpty: true,
        },
    },
    password: {

        type: DataTypes.STRING,
        allowNull: false,

    },

},
    {
        // dans le 2ème objet on dit dans quelle bdd devront persister les infos
        sequelize, // pour cela on indique le client connecté à la bdd
        modelName: 'User', // on donne un nom au modèle, cela pourra servir plus tard
        tableName: 'user', // on peut demander à sequelize de ranger les infos liées à ce modèle dans la table de notre choix 
        timestamps: false,
    },
);

module.exports = User; 