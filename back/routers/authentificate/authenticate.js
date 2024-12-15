import sign from "../../jwt/sign.js";
import emailUser from "../../data/recupData/recupUser/emailUser.js";
import dotenv from 'dotenv';
dotenv.config(); 

const authenticate = async (email, password, res) => {

    const user = await emailUser(email); 

    if(user.length == 0 ){ 
        return res.status(401).json({ message: 'Identifiants invalides' });
    }
    console.log(user); 
    const dataUser = user[0]; 
    console.log(dataUser,email, password, data)
    if(dataUser.password != password){ 
        return res.status(401).json({ message: 'Identifiants invalides' });
    } 

    if(dataUser.role === "admin") {   
        const token = sign(dataUser.name,process.env.kEYM);
        return res.json({token}); 
    } else { 
        return res.status(401).json({ message: 'Identifiants invalides' });
    }
};

export default authenticate; 
