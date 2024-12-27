import User from "../../models/user.js"; 
import jwt from 'jsonwebtoken';

export default async function jwtUser(token) {

    if(!token){ 
        return res.status(401).json({message: "token not good"}); 
    }
    try{ 
        const decode = jwt.verify(token,process.env.KEYM ); 
        const user = await User.findOne({ where: { decode } });
        if(user) { 
            return res.status(200).json({message: "ok ça marche", data: user.dataValues}); 
        } else { 
            return []; 
        }; 

    } catch (error){ 
        console.log(`Error fetching user: ${error}`); 
        return []; 
    }
}