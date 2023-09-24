const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path')
const dotenv=require('dotenv');

dotenv.config({path:path.join(__dirname,"config/config.env")})


app.use(express.json());
app.use(cors());

const auth = require('./routes/auth')
app.use('/api/v1/',auth);

module.exports = app;