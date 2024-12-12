import express from "express"; 

import route from './routers/route.js'; 
import dotenv from 'dotenv';
dotenv.config(); 

import test from "./routers/test.js"; 
import campain from "./routers/routeCampain.js"; 

import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express(); 
const port = 3000; 

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    res.send(process.env.PG_URL)
  }); 

app.use("/route" , route); 

app.use("/test" , test); 

app.use("/campain", campain); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }); 