import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config(); 

const verifyMembre = (req,res,next) => { 
    const token = req.headers["token"]; 

    if(!token) return res.status(401)

    jwt.verify(token, process.env.KEYM, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next();
    });
}; 

export default verifyMembre; 