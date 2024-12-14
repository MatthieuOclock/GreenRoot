import express from "express";
import authenticate from "./authenticate.js";

const route = express.Router(); 
const tokensM = []; 

route.post("/" , async (req , res) => { 
    
    const {email,password} = req.body; 

    const login = authenticate(email,password,tokensM,res); 
})

route.get("/tokens", async (req, res) => { 
    res.json({token: tokensM}); 
}) 

export default route ; 