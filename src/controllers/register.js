// RegisterController
// ==============
// Controller for the register.

var express         = require('express'),
    RegisterController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt');


RegisterController.route('/?')
  // GET /
  // -----
  // Render the register page
  .get(function(req, res, next) {
    res.render('register', {
      pageTitle: 'Register for an account | Sign up',
      message:   req.session.isLoggedIn ? 'You are already logged in' : 'You need to sign up'
    });
  })
  // POST /
  // ------
  // Log the user in
  .post(function(req, res, next) {
    if (req.body.password === req.body.password_confirmation) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Save user inside here
        User.create({
          fullname:  req.body.fullname,
          username:  req.body.username,
          password:  hash
        }, function(err, user) {
          if (err) {
            console.log(err);
            res.render('register', {message: "Could not register " + err});
          } else {
            req.session.isLoggedIn  = true;
            req.session.userId      = user._id;
            res.redirect('/');
            console.log("succesfull autentification")
          }
        });
      });
    }
  })

module.exports = RegisterController;
