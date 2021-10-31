require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);

// TO DO
// get database, user and password from .env file

//insert database
const database = 'a database';
// insert user
const user = 'a user';
// insert password
const password = 'a password'
 
const Sequelize = require('sequelize');
const myDatabase = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'mysql',
});
 
const sequelizeSessionStore = new SessionStore({
    db: myDatabase,
});
 
const app = express();
 
app.use(cookieParser());
app.use(expressSession({
    secret: 'keep it secret, keep it safe.',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get('/', (req, res, next) => {
    res.send('<h1>Hello world (Sessions)</h1>');
});

app.listen(5000);

console.log(password);