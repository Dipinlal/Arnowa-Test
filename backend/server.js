const app = require('./app');
const path = require('path');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

dotenv.config({path:path.join(__dirname,"config/config.env")})

const server = app.listen(process.env.PORT,()=>{
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})

connectDatabase();