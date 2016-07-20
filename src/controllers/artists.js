
// ==============
// Controller for the new.

var express = require('express'),
  Artists = express.Router(),
  Artist  = require(__dirname + '/../models/artist'),
  Item    = require(__dirname + '/../models/item'),  
  crypto  = require('crypto'),
  path    = require('path'),
  multer  = require('multer'),
  upload  = multer({dest: __dirname + '/../public/img/'});

/* GET /artists/new/? listing. */
Artists.route('/new/?')
.get(function(req, res, next) {
  if(req.session.isLoggedIn) {
    next();
  } else {
    res.redirect('/login')
  }
}, function(req, res, next) {
    Artist.find(function(err, artists){
      console.log(err)
      if (err) {
        res.send('ERROR: ' + err);
      } else {
        res.render('new_artist', {artists: artists});
      }
  });
})
/* POST /artists/new? */
.post(upload.single('foto'), function(req, res, next) {
  console.log(req.body);
  // console.log(req.file);
  console.log(req.file.filename)
  Artist.create({
    fullname: req.body.fullname,
    about:    req.body.about,
    foto:     req.file.filename
  }, function (err, artist) {
    if (err) return next(err);
    res.redirect("/artists");
  });
});
 // :id/
/* GET /artists/:id */
Artists.route('/:id')
.get(function(req, res, next) {
  Artist.findById(req.params.id, function (err, artist) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
        Item.find({artist: artist.fullname}, function(err, items) {
          // console.log(items)
          if(err) { 
            console.log('could not find Items')
          } else {
            // console.log(artist.fullname);
            // res.json(items)
            res.render('artist-collection', {
              artist: artist,
              items: items
            })
          }
        })
      }
  });
})
/* PUT /artists/:id */
.put(function(req, res, next) {
  // console.log(req.body);
  Artist.findByIdAndUpdate(req.params.id, req.body, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
   
  });
})
/* PATCH /artists/:id */
.patch(function(req, res, next) {
  // console.log(req.body);
  Artist.findByIdAndUpdate(req.params.id, req.body, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
})
/* DELETE /artists/:id */
.delete(function(req, res, next) {
  // console.log(req.body);
  Artist.findByIdAndRemove(req.params.id, req.body, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
});

/* GET /artists/? listing. */
Artists.route('/?')
  .get(function(req, res, next) {
    Artist.find(function(err, artists){
      // console.log(users)
      console.log(err)
      if (err) {
        res.send('ERROR: ' + err);
      } else {
        res.render('artists', {artists: artists});
        // $("a.grouped_elements").fancybox();
      }
    // res.json(users)
  });
});



module.exports = Artists;
