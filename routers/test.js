const express = require("express");
const route = express.Router(); 
const db = require("../data/recupData/repUser"); 

route.get("/" , (req , res) => { 
    res.status(200).json({message: "ok ça marche",test: db}); 
})

module.exports = route ; 