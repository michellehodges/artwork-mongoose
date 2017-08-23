const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

// mongoose.connect('mongodb://localhost:27017/collections');

const artworkSchema = new mongoose.Schema({
  image: { type: String },
  artist: { type: String, required: true },
  artwork: [{
    title: { type: String, required: true },
    year: { type: Number, required: true},
    medium: { type: String, required: true }
  }],
  tags: [ String ]
})

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
