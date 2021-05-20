// set variable of evironment
require('dotenv').config();

// Import module 
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');


// Import module local file
const loginAPI = require('./src/apis/login.api');


// Set port
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3500);

// Set up server
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// Connect to MongoDB with mongoose 
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : process.env.MONGO_URL_LOCAL;
mongoose.connect(MONGO_URL);


// Listening ...... 
app.listen(PORT,()=>{
    console.log('Server is listening on port',PORT);
})

// use cac API
// API chuc nang login
app.use('/auth/login', loginAPI);

