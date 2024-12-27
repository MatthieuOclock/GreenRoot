import jwt from 'jsonwebtoken';

const verify = async (token) => { 
    try {
        if (!token) throw new Error("Token is missing");

        const extractedToken = token.split(' ')[1];
        if (!extractedToken) throw new Error("Token format is invalid");

        await new Promise((resolve, reject) => {
            jwt.verify(extractedToken, process.env.KEYM , (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        return true; 
    } catch (error) {
        return false; 
    }
};

export default verify; 