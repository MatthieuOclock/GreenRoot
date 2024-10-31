import express from "express"; 

import route from './routers/route.js'; 
import dotenv from 'dotenv';
dotenv.config(); 

import test from "./routers/test.js"; 

const app = express(); 
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(process.env.PG_URL)
  }); 

app.use("/route" , route); 

app.use("/test" , test); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }); 