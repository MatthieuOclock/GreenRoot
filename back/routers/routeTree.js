import express from "express"; 
import allTree from "../data/recupData/recupTree/allTree.js";
const route = express.Router(); 


route.get("/", async (req,res) => { 
    const tree = await allTree; 
    res.status(200).json({message: "ok ça marche", data: tree}); 
}); 

export default route; 