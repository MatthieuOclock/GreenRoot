import express from "express"; 

import route from './routers/route.js'; 
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); 

import test from "./routers/test.js"; 
import campain from "./routers/routeCampain.js"; 
import login from "./routers/authentificate/login.js"; 
import inscrition from "./routers/inscription.js; "

import bodyParser from 'body-parser';


const app = express(); 
const port = 1234; 

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

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

app.use("/testlogin",login); 

app.use("/inscription",inscrition); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }); 