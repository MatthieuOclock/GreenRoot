import express from 'express';
const routetest = express.Router(); 
import allCampain from '../data/recupData/recupCampain/allCampain.js';

routetest.get("/" , async (req , res) => { 
    const campain = await allCampain; 
    res.status(200).json({message: "ok ça marche", test2: {message : campain}}); 
})

export default routetest; 