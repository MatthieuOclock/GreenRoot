import jwt from 'jsonwebtoken';

const verify =  (Token,key) => { 
    const token = Token && Token.split(' ')[1]; 

    jwt.verify(token, key, (err, user) => {
        if (err) return "erreur"; 
    });

    return "ok"; 
};

export default verify; 