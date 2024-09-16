import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            console.log('User not found');
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        console.log('User added to req:', user);
        next();
    } catch (error) {
        console.log('Token verification failed', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export default authenticateJWT;