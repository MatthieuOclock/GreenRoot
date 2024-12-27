import express from "express"; 

import route from './routers/route.js'; 
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
dotenv.config(); 

import test from "./routers/test.js"; 
import campain from "./routers/routeCampain.js"; 
import login from "./routers/authentificate/login.js"; 
import inscrition from "./routers/inscription.js"; 
import tree from "./routers/routeTree.js";
import user from "./routers/routeUser.js"; 
import header from "./routers/routeHeadVerify.js"; 
import authenticateJWT from "./routers/authentificateJWT.js";
import logine from "./routers/login.js";

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
app.use(express.static('public'));

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

app.get('/', (req, res) => {
    res.send(process.env.PG_URL)
  }); 

app.use("/route" , route); 

app.use("/test" , test); 

app.use("/campain", campain); 

app.use("/testlogin",login); 

app.use("/register",inscrition); 

app.use("/tree", tree); 

app.use("/user", user); 

app.use("/headerVerify", header); 

app.use(logine); 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }); 