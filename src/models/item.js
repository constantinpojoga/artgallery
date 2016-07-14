// Item Model
// ----------

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

module.exports = mongoose.model('Item', ItemSchema);
