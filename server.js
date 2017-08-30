const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/goal', { useMongoClient: true }); // connect to our database

app.set('view engine', 'ejs'); // set up ejs for templating
require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(session({
    secret: 'goals',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port, () => console.log(`The magic happens at http://localhost:${port}`));
