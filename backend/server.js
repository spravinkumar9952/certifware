import Express  from "express";
import bodyParser from "body-parser";

// Express app
const app = Express();
// port number
const port = 8080;

// json bodyparser
app.use(bodyParser.json());

// Home page
app.get('/', (req, res)=>{
    res.send("Node JS Home Page!");
});

// Server listening port 
app.listen(port, (req, res) =>{
    console.log(`Server Connected on Port number: ${port}`);
});