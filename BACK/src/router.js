import express from 'express';
import user from './app/controllers/userController.js';
import order from './app/controllers/orderController.js';
import tree from './app/controllers/treeController.js';
import campain from './app/controllers/campainController.js';
import authController from './app/controllers/authController.js';
import authenticateJWT from './app/middleware/authenticateJWT.js';
import searchController from './app/controllers/searchController.js';

const router = express.Router();

//Routes de recherche
router.get('/search', searchController.search);

// Routes pour les membres
router.get('/user', user.list);
router.get('/user/:id', user.findUserById);
router.get('/user/test/test', authenticateJWT, user.getMe);
router.get('/user/me/trees', authenticateJWT, user.getUserTrees);
router.post('/user', user.addNewUser);
router.put('/user/:id', authenticateJWT, user.updateUser);
router.delete('/user/:id', authenticateJWT, user.deleteUser);

// Routes pour les commandes
router.get('/order', order.list);
router.post('/order', authenticateJWT, order.addNewOrder);
router.put('/order/:id', authenticateJWT, order.updateOrder);
router.delete('/order/:id', authenticateJWT, order.deleteOrder);
router.get('/order/:id', authenticateJWT, order.findOrderById);
router.get('/order/me/trees', authenticateJWT, user.getUserOrders);

// Routes pour les campagnes
router.get('/campain', campain.list);
router.post('/campain', authenticateJWT, campain.addNewCampain);
router.put('/campain/:id', campain.updateCampain);
router.delete('/campain/:id', campain.deleteCampain);
router.get('/campain/:id', campain.findCampainById);

// Routes pour les arbres
router.get('/tree', tree.list);
router.post('/tree', authenticateJWT, tree.addNewTree);
router.put('/tree/:id', tree.updateTree);
router.delete('/tree/:id', tree.deleteTree);
router.get('/tree/:id', tree.findTreeById);

// Routes pour l'inscription
router.post('/register', authController.register);

// Routes pour la connexion
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
