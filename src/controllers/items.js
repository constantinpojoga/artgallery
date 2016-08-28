
// ==============
// Controller for the new.

var express = require('express'),
  Items = express.Router(),
  Artist  = require(__dirname + '/../models/artist'),
  Item    = require(__dirname + '/../models/item'),  
  crypto  = require('crypto'),
  path    = require('path'),
  multer  = require('multer'),
  upload  = multer({dest: __dirname + '/../public/img/'});

 // /new 
Items.route('/new')
  .get(function(req, res, next) {
  if(req.session.isLoggedIn) {
      next();
    } else {
      res.redirect('/login')
    }
    }, function(req, res, next) {
      Artist.find(function(err, artists) {
        if(err) console.log('ERROR adding new artist ' + err);
        res.render('new_item', {
          pageTitle: 'Artgallery - Add new Item',
          artists: artists})
      })
      
  })
.post(upload.single('foto'), function(req, res, next) {
  Item.create({
    title:    req.body.title,
    artist:   req.body.artist,
    about:    req.body.about,
    location: req.body.location,
    created:  req.body.created,
    subject:  req.body.subject,
    periods:  req.body.periods,
    foto:     req.file.filename
  }, function (err, artist) {
    if (err) console.log(err);
    res.redirect('/items');
  });
});
 // :id/
/* GET/items/:id */
Items.route('/:id')
  .get(function(req, res, next) {
    Item.findById(req.params.id, function (err, item) {
      if (err) console.log(err);
      res.render('item-details', item);
    });
  })
  /* PUT/items/:id */
  .put(function(req, res, next) {
    // console.log(req.body);
    Item.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
      if (err) console.log(err);
      res.json(item);
    });
  })
  /* PATCH/items/:id */
  .patch(function(req, res, next) {
    // console.log(req.body);
    Item.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
      if (err) console.log(err);
      res.json(item);
    });
  })
  /* DELETE/items/:id */
  .delete(function(req, res, next) {
    // console.log(req.body);
    Item.findByIdAndRemove(req.params.id, req.body, function (err, item) {
      if (err) console.log(err);
      res.json(item);
    });
  });

/* GET //items/? listing. */
Items.route('/?')
   .get(function(req, res, next) {
    Item.find(function(err, items){
      // console.log(users)
      console.log(err)
      if (err) {
        res.send('ERROR: ' + err);
      } else res.render('items', {
        pageTitle: 'Artgallery - All Items',
        items: items});
      // res.json(users)
    });
  })
  /* POST //items/? */
  .post(function(req, res, next) {
    // console.log(req.body);
    Items.create(req.body, function (err, artist) {
      if (err) return next(err);
      res.json(artist);
    });
  });
 
module.exports = Items;
