import express from "express"; 
import verify from "../jwt/verify.js";
const route = express.Router(); 

route.get("/", async (req , res) => {
    const token = req.headers["Authorization"]; 
    const login = await verify(token); 
    res.json({message: "ok ça marche" , data : login})
}); 

export default route; 