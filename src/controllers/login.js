// LoginController
// ===============
// Controller for handling logins

var express         = require('express'),
    LoginController = express.Router(),
    bcrypt          = require('bcrypt'),
    User            = require(__dirname + '/../models/user');


LoginController.route('/?')
  // GET /
  // -----
  // Render the login page
  .get(function(req, res, next) {
    res.render('login', {
      pageTitle: 'Log in to continue | Sign in',
      message:   req.session.isLoggedIn ? 'You are already logged in' : 'You need to sign in'
    });
  })
  // POST /
  // ------
  // Log the user in
  .post(function(req, res, next) {
    User.findOne({username: req.body.username}, function(error, user) {
      if (error || !user) {
         res.render('login', {
              pageTitle: 'Log in to continue | Sign in',
              message:   'Could not find the user'
            });
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.send('ERROR: ' + err);
          } else if (result) {
            req.session.isLoggedIn  = true;
            req.session.userId      = user._id;
            req.session.user = req.body.username;
            console.log("succesfull log in")
            res.redirect('/')
          } else {
            res.render('login', {
              pageTitle: 'Log in to continue | Sign in',
              message:   'Wrong username or password'
            });
          }
        })
      }
    })
  });

module.exports = LoginController;
