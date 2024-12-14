import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config(); 

const verify = (token,req,res) => { 
    try{
        const test = jwt.verify(token,process.env.KEYM); 
        req.json(test); 
    } catch(error){ 
        res.status(403).json({message: "Token invalide"}); 
    }; 
}; 

export default verify; 