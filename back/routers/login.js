import express from "express";
import authController from "./authController.js";
const route = express.Router(); 

route.post('/login', authController.login);
route.post('/logout', authController.logout);

export default route ; 