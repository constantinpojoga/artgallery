RegisterController
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
      // csrfToken: req.csrf()
    });
    console.log(req.body);
  })
  // POST /
  // ------
  // Log the user in
  .post(function(req, res, next) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // Save user inside here
      User.create({
        fullname:  req.body.fullname,
        username:  req.body.username,
        password:  hash,
        email:     req.body.email,
        adress:    req.body.address,
        favorites: [],
        cars: []
      }, function(err, user) {
        if (err) {
          console.log(err);
          res.render('home', {error: err});
        } else {
          res.render('req.body.fullname');
          console.log(req.body)
        }
      });
    });
  })

module.exports = RegisterController;
