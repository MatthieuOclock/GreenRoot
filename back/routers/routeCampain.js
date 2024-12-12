import express from "express"; 
const route = express.Router(); 
import allCampain from '../data/recupData/recupCampain/allCampain.js';

route.get("/", async (req , res) => {
    const campain = await allCampain; 
    res.status(200).json({message: "ok ça marche" , data : campain}); 
}); 

export default route; 