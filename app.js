const express = require ('express');
const passport = require ('passport')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser');
const connectEnsureLogin = require('connect-ensure-login');
const { connectToMongoDB } = require('./database');

const UserModel = require ('./models/users');
const BlogModel = require ('./models/blogs');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const HOST = 'localhost'
const PORT = 7070;
const app = express();


require('./database').connectToMongoDB() // Connect to MongoDB

require('dotenv').config()

require("./authentication/auth") 


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', authRoute);
app.use('/', postRoute);
app.use(express.json());
app.set('views', 'views');
app.set('view engine', 'ejs');


// renders the home page
app.get('/', (req, res) => {
    res.send('Welcome to the Blog Homepage');
});

app.get('/signup', (req, res) => {
res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('signup');
});

app.get('/create', (req, res) => {
    res.render('create');
});


app.get('/signup_successful', (req, res) => {
    res.render('signup_successful');
});



// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, HOST, () => {
    console.log(`Server is now running on http://${HOST}:${PORT}`)
})
