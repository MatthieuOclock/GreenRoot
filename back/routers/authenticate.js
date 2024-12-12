import sign from "../jwt/sign.js";
import emailUser from "../data/recupData/recupUser/emailUser.js";
import dotenv from 'dotenv';
dotenv.config(); 

const authenticate = async (email, password, status, redis, res) => {

    const user = emailUser(email); 

    if(user.length == 0 ){ 
        res.status(401).json({ message: 'Identifiants invalides' });
    }

    const dataUser = user[0]; 

    if(dataUser.password != password){ 
        res.status(401).json({ message: 'Identifiants invalides' });
    } 

    if(dataUser.role === status) {   
        const token = sign(dataUser,process.env.keyMember);
        await redis.set(dataUser.email, JSON.stringify({id: dataUser.id , token: token})); 
        res.json({token}); 
    } else { 
        res.status(401).json({ message: 'Identifiants invalides' });
    }
};

export default authenticate; 
