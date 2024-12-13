import express from "express";
import authenticate from "./authenticate.js";

const route = express.Router(); 
const tokens = []; 

route.post("/" , async (req , res) => { 
    
    const {email,password} = req.body; 

    const login = authenticate(email,password,tokens,res); 
})

route.get("/tokens", async (req, res) => { 
    res.json({token: tokens}); 
}) 

export default route ; 