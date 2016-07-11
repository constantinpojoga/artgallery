// HomeController
// ==============
// Controller for the homepage.

var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt');
    // exphbs          = require('express-handlebars');


HomeController.route('/?')
  // GET /
  // -----
  // Serve the homepage
  .get(function(req, res, next) {
    
    User.find(function(err, users){
      // console.log(users)
      console.log(err)
      res.render('home', {});
      // res.json(users)
    });
  });
  // POST /
  // ------
  // Register a new user

module.exports = HomeController;

