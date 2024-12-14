import express from "express";
import addUser from "../data/recupData/recupUser/addUser.js";
const route = express.Router(); 
const reponse = []; 
route.post("/" ,async (req , res) => { 
    try { 
        const {first_name, 
            last_Name, 
            email, 
            phone, 
            role, 
            password
        } = req.body; 
        
        reponse.push[{first_name, last_Name, email, phone, role, password}]; 

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
    res.json({user : reponse}); 
});     

export default route ; 