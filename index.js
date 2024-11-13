
//exporting packages
const express = require('express');

const session = require('express-session');

// const MySQLStore = require('connect-mysql2')(session);

const path = require('path');

require('dotenv').config();

const db = require('./config/db');

const authRoutes = require('./routes/auth');

// initialize the server

const app = express();

//set up the middleware- telling our serve to handle data in json format.

app.use(express.json());

// setup session, you can store data at later time.

app.use(
    session({
        key: 'user_sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // store: new MySQLStore({}, db)


    })
);


//routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/auth', authRoutes)

//start the server

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Success running the server on http://localhost:${port}`)

})