// Artist Model
// ----------

var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  fullname: String,
  about:    String,
  foto:     String
}, {
  strict: false
});

module.exports = mongoose.model('Artist', ArtistSchema);
