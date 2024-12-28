import express from "express"; 
import user from "./userController.js"; 
import authenticateJWT from "./authentificateJWT.js";
const route = express.Router(); 

route.get('/userInfo', authenticateJWT, user.getMe);
route.get('/treeForUser', authenticateJWT, user.getUserTrees);


export default route; 