import express from "express";
import order from "./orderController";
const route = express.Router(); 

route.get('/order', order.list);
route.post('/order', authenticateJWT, order.addNewOrder);
route.put('/order/:id', authenticateJWT, order.updateOrder);
route.delete('/order/:id', authenticateJWT, order.deleteOrder);
route.get('/order/:id', authenticateJWT, order.findOrderById);

export default route ; 