import express from "express";
import authenticate from "./authenticate.js";

const route = express.Router(); 

route.post("/" , async (req , res) => { 
    
    const {email,password} = req.body; 

    authenticate(email,password,res); 
})

export default route ; 