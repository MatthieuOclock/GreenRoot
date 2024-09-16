import express from 'express';
import * as dotenv from 'dotenv';
import session from 'express-session';
import router from './src/router.js';
import cors from 'cors';
import Stripe from 'stripe';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Initialiser Stripe avec la clé secrète
const stripeInstance = new Stripe('sk_test_51PM77gHRY0RGHhfcuMQermEM6MJB2UklTup1slR0PWHw5XylnxZvtTiY5IL4i4EVDm8HeUSSKp4kKewFpjHfg8jf007ZkdH3IE');

// Configurer CORS
const corsOptions = { 
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount,
            currency: 'eur',
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || '1234',
    cookie: {
        secure: false, // mettre true sur https
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use(express.static('./src/public'));

app.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.use(router);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
