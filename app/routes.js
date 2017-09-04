const routeController = require('./controllers/route.controller');

module.exports = (app, passport) => {

    // HOME PAGE (with login links)
    app.route('/').get(routeController.homePage)

    // LOGIN
    app.route('/login')
        .get(routeController.loginPage) // show the login form
        .post(routeController.loginAuth); // process the login form

    // SIGNUP
    app.route('/signup')
        .get(routeController.signupPage)
        .post(routeController.signupAuth)

    // After Logging In Pages
    // route middleware to verify if loggedin (the isLoggedIn function below)
    app.route('/profile')
        .get(isLoggedIn, routeController.profilePage)
    app.route('/profile/:id')
        .get(isLoggedIn, routeController.profileDelete)

    app.route('/goals')
        .get(isLoggedIn, routeController.goalsPage)

    app.route('/goals/:id')
        .post(isLoggedIn, routeController.goalsPost)
        .get(isLoggedIn, routeController.goalsPost)

    // LOGOUT
    app.route('/logout')
        .get(routeController.logout);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
