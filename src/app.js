// App.js
// ======

// Require dependencies
// --------------------
var express     = require('express'),
    app         = express(),
    exphbs      = require('express-handlebars'),
    bodyParser  = require('body-parser'),
    session     = require('express-session');

// Configuration
// -------------
app.engine('hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));



// Connect to database
// -------------------
require('./config/db');
// Middleware
// ----------
app.use(session({
  name:   "sessionclass",
  resave: false,
  saveUninitialized: false,
  secret: 'dfhbidhf3-fhjfjvtvg'
}));



app.use(express.static(__dirname + '/public')); // Serve static files
app.use('/artists', require('./controllers/artists'));
app.use('/items', require('./controllers/items'));
app.use('/?', require('./controllers/home'));


// Start the server
// ----------------
var server = app.listen(process.env.PORT || 3000, function() {
  console.log('App is running at http://localhost:' + server.address().port);
});
