const express = require("express");

const bodyParser = require("body-parser")
const cors = require("cors");

const AuthRouter = require('./routes/AuthRouter')
const ProductRouter = require('./routes/ProductRouter')

const app = express();
require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:3030/");
})
