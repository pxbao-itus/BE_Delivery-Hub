// set variable of evironment
require('dotenv').config();

// Import module 
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

// Import module local file
const loginAPI = require('./src/apis/login.api');
const accountAPI = require('./src/apis/account.api');
const addressAPI = require('./src/apis/address.api');
const userAPI = require('./src/apis/user.api');

// Set port
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3500);


// Set up server
app.use(
    cors({
            // Configures the Access-Control-Allow-Origin
        origin: process.env.CORS_ORIGIN,

        // Configures the Access-Control-Allow-Methods
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

        //Configures the Access-Control-Allow-Headers
        allowedHeaders:
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',

        // Configures the Access-Control-Allow-Credentials
        credentials: true,

        //Configures the Access-Control-Expose-Headers
        exposedHeaders: 'Content-Range,X-Content-Range,Authorization',

        // Provides a status code to use for successful OPTIONS requests
        optionsSuccessStatus: 200,
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(morgan('dev'));
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

// API chuc nang SignUp
app.use('/signup',accountAPI);

// API chuc nang lay dia chi
app.use('/address',addressAPI);

// API chuc nang lien quan customer
app.use('/customer',userAPI);