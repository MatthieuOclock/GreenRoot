// dans un script js
// je prends mes modèles
import User from './user.js';
import Campain from './campain.js';
import Order from './order.js';
import Tree from './tree.js';
// je prends mon client connecté

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
User.hasMany(Campain, { foreignKey: 'user_id', as: 'campains' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Campain.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Campain.hasMany(Tree, { foreignKey: 'campain_id', as: 'trees' });
Tree.belongsTo(Campain, { foreignKey: 'campain_id', as: 'campain' });
Tree.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Tree.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default { User, Campain, Order, Tree };