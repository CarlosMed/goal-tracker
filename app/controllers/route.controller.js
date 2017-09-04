const passport = require('passport');
const User = require('../models/user');

// Render Homepage
const homePage = (req, res) => {
    res.render('index.ejs');
}

// Render Profile
const profilePage = (req, res) => {
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
    });
}

// Delete Profile
const profileDelete = (req, res) => {
    User.remove({"_id": req.params.id}, (err, user) => {
        if (err)
            throw err;
        res.render("index.ejs");
    })
}

// Render Goals
const goalsPage = (req, res) => {
    res.render('goals.ejs', {
        user: req.user,
    });
}

// Posting Goals
const goalsPost = (req, res) => {
}

// Update Goals
const goalsUpdate = (req, res) => {
}

// Update Goals
const goalsDelete = (req, res) => {
}

// TODO: Delete for prod - Just to have a view in the browser of the DB
const userViews = (req, res) => {
    User.find(function (err, user) {
        res.json(user);
    });
}

// Render Login
const loginPage = (req, res) => {
    res.render('login.ejs', {
        message: req.flash('loginMessage')
    });
}

// Render Signup
const signupPage = (req, res) => {
    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
}

// Login Auth.
const loginAuth = passport.authenticate('local-login', {
    successRedirect: '/goals', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
})

// Signup Auth
const signupAuth = passport.authenticate('local-signup', {
    successRedirect: '/goals',
    failureRedirect: '/signup',
    failureFlash: true
})

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


module.exports = {
    homePage,
    profilePage,
    profileDelete,
    goalsPost,
    goalsUpdate,
    goalsDelete,
    goalsPage,
    loginPage,
    signupPage,
    loginAuth,
    signupAuth,
    logout,
    userViews
};
