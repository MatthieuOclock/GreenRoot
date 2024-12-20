import express from "express"; 
import allTree from "../data/recupData/recupTree/allTree.js";
import idTree from "../data/recupData/recupTree/idTree.js";
const route = express.Router(); 


route.get("/", async (req,res) => { 
    const tree = await allTree; 
    res.status(200).json({message: "ok ça marche", data: tree}); 
}); 

route.get("/:tree", async (req,res)=>{ 
    const tree = await idTree(req.params.tree); 
    res.status(200).json({message: "ok ça marche", data:tree}); 
}); 

export default route; 