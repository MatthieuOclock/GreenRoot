const express = require("express"); 

const app = express(); 
const port = 3000; 

app.get('/', (req, res) => {
    res.send('Hello World!')
  }); 

const route = require("./routers/route"); 

app.use("/route" , route); 

const test = require("./routers/test"); 

app.use("/test" , test); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }); 