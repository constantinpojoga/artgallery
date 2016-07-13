// Item Model
// ----------
// Representation of a user as an object

var mongoose = require('mongoose');


var ItemSchema = new mongoose.Schema({
  title:    String,
  artist:   String,
  about:    String,
  location: String,
  created:  String,
  subject:  String,
  periods:  String,
  foto:     String,
}, {
  strict: false
});

// We are declaring Item as the new  model name and assigning the schema to this model
// in the second argument
module.exports = mongoose.model('Item', ItemSchema);
