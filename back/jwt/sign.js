import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const sign = (user, key) => {
    return jwt.sign({ user }, key,{ expiresIn: '1h' });
}; 

export default sign; 