import express from "express"; 
import jwtUser from "../data/recupData/recupUser/jwtUser.js";
const route = express.Router(); 


route.get("/", async (req,res) => { 
    const Authorization = req.header["authorization"]; 
    const token = Authorization && Authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Token manquant' });
    }; 

    await jwtUser(token); 

}); 

export default route; 