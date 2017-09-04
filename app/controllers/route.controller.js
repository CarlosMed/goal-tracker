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
    User.findByIdAndRemove({"_id": req.params.id}, (err, user) => {
        if (err)
            throw err;
        res.render("index.ejs");
    })
}

// Render Goals
const goalsPage = (req, res) => {
    User.find({}, (err, data) => {
        console.log(data)
        res.render('goals.ejs', {
            user: req.user,
        });
    })
}

// Posting Goals
const goalsPost = (req, res) => {
    User.findByIdAndUpdate({ "_id": req.params.id }, req.body.goals, (err, user) => {
        user.local.goals.unshift({ "goal": req.body.goal}); //Adds it to the end

        // Save the user
        user.save((err) => {
            User.find({}, (err) =>{
                if (err)
                    throw err;
                res.render("goals.ejs", {
                    user: req.user,
                });
            })
        })
    })
}

// Update Goals
const goalsUpdate = (req, res) => {
    /**
     * use what i did in the goals post fuction to find by id and instead of doing
     * a POST request it'll be a PUT to push the update
     */
}

// Delete Goals
const goalsDelete = (req, res) => {
    /**
     * pass a function where it looks for an onclick event and delete it based
     * on which goal was clicked by getting the user.local.goals[i]._id
     */
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
};
