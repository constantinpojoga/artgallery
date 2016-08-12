// HomeController
// ==============
// Controller for the homepage.

var express         = require('express'),
    HomeController  = express.Router(),
    Artist            = require(__dirname + '/../models/artist'),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt');
    // exphbs          = require('express-handlebars');

HomeController.route('/login/?')
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

HomeController.route('/register/?')
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

HomeController.route('/?')
  // GET /
  .get(function(req, res, next) {
    Artist.find(function(err, artists){
      if (err) {
         console.log(err)
        res.send('ERROR: ' + err);
      } else res.render('home', {});
    });
  });

module.exports = HomeController;

