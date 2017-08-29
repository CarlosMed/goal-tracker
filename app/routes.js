module.exports = (app, passport) => {
    // HOME PAGE (with login links)
    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });

    // LOGIN
    // show the login form
    app.get('/login', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/goals', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP
    app.get('/signup', (req, res) => {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/goals',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // PROFILE SECTION
    // route middleware to verify if logged in (the isLoggedIn function)
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/goals', isLoggedIn, (req, res) => {
        res.render('goals.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // LOCALLY
    app.get('/connect/local', (req, res) => {
        res.render('connect-local.ejs', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/goals', // redirect to the secure profile
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
