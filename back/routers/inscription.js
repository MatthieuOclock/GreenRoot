import express from "express";
import addUser from "../data/recupData/recupUser/addUser.js";
const route = express.Router(); 

route.post("/" ,async (req , res) => { 
    try { 
        const {first_name, 
            last_Name, 
            email, 
            phone, 
            role, 
            password
        } = req.body; 
        
        await addUser(first_name, 
            last_Name, 
            email, 
            phone, 
            role, 
            password); 
        res.status(201).json({message:"correct create user"}); 
    } catch (error) { 
        res.status(401).json({message: "erreur create user"}); 
    }
}); 

route.get("/instcription",(req,res) => { 
    
});     

export default route ; 