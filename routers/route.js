import express from "express";
const route = express.Router(); 

route.get("/" , (req , res) => { 
    res.status(200).json({message: "ok ça marche"}); 
})

export default route ; 