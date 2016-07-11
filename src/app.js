// App.js
// ======
// This file serves as the main
// server startup script.

// Require dependencies
// --------------------
var express     = require('express'),
    app         = express(),
    exphbs      = require('express-handlebars'),
    bodyParser  = require('body-parser');


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
app.use(bodyParser.urlencoded({extended: true}))

// Connect to database
// -------------------
require('./config/db');

// Middleware
// ----------
app.use(express.static(__dirname + '/public')); // Serve static files
app.use(require('./controllers/home'));
app.use('/login', require('./controllers/login'));
app.use('/register', require('./controllers/register'));


// Start the server
// ----------------
var server = app.listen(3000, function() {
  console.log('App is running at http://localhost:' + server.address().port);
});
