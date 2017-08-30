const passport = require('passport');

const homePage = (req, res) => {
    res.render('index.ejs'); // load the index.ejs file
}

const profilePage = (req, res) => {
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
    });
}

const goalsPage = (req, res) => {
    res.render('goals.ejs', {
        user: req.user // get the user out of session and pass to template
    });
}

const loginPage = (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
        message: req.flash('loginMessage')
    });
}

const signupPage = (req, res) => {
    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
}

const connectLocal = (req, res) => {
    res.render('connect-local.ejs', {
        message: req.flash('loginMessage')
    });
}

const loginAuth = passport.authenticate('local-login', {
    successRedirect: '/goals', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
})

const signupAuth = passport.authenticate('local-signup', {
    successRedirect: '/goals',
    failureRedirect: '/signup',
    failureFlash: true
})

const connectLocalAuth = passport.authenticate('local-signup', {
    successRedirect: '/goals', // redirect to the secure profile
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
})

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


module.exports = {
    profilePage,
    goalsPage,
    homePage,
    loginPage,
    signupPage,
    connectLocal,
    loginAuth,
    signupAuth,
    connectLocalAuth,
    logout
};
