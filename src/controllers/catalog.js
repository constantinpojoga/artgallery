// CatalogController
// ==============
// Controller for the catalog.

var express            = require('express'),
    CatalogController  = express.Router(),
    Artist             = require(__dirname + '/../models/artist');
  // exphbs          = require('express-handlebars');


CatalogController.route('/?')
// GET /
// -----
// Serve the catalog page
.get(function(req, res, next) {
  
  Artist.find(function(err, artists){
    // console.log(users)
    console.log(err)
    if (err) {
      res.send('ERROR: ' + err);
    } else res.render('catalog', {
      artists: artists, 
      pageTittle: "Browse collection"
    });
    // res.json(users)
  });
});
// POST /
// ------
// Register a new user

module.exports = CatalogController;
