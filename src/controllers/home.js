// HomeController
// ==============
// Controller for the homepage.

var express         = require('express'),
    HomeController  = express.Router(),
    Artist            = require(__dirname + '/../models/artist'),
    bcrypt          = require('bcrypt');
    // exphbs          = require('express-handlebars');

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

