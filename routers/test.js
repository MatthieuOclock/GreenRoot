import express from 'express';
const routetest = express.Router(); 
import db from "../data/recupData/repUser.js"; 

routetest.get("/" , (req , res) => { 
    res.status(200).json({message: "ok ça marche",test: db, test2: {message : 2}}); 
})

export default routetest; 