const express = require('express');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const server = express();

server.engine('mustache', mustache());
server.set('views', './views');
server.set('view engine', 'mustache');
server.use(express.static('views'));

let Artwork = require('./mongoose');

mongoose.connect('mongodb://localhost:27017/collections');

let artwork = new Artwork({
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Artemisia_Gentileschi_-_Sleeping_Venus.JPG/300px-Artemisia_Gentileschi_-_Sleeping_Venus.JPG",
  artist: "Artemisia Gentileschi",
  artwork: [{
    title: "Venus and Cupid",
    year: 1593,
    medium: "Oil on canvas"
  }],
  tags: ["italian", "oil"]
})

Artwork.create({
  image: "http://www.artnet.com/WebServices/images/ll00012lld2vxFFgVeECfDrCWvaHBOcXkJ/master-of-the-legend-of-saint-lucy-the-virgin-and-child-enthroned-with-music-making-angels-before-a-prospect-of-bruges.jpg",
  artist: "The Bruges Master Of",
  artwork: [{
    title: "Madonna and Child Enthroned with Saints",
    year: 1499,
    medium: "Oil on panel"
  }],
  tags: ["flemish", "oil"]
})
  .then(function(pieceOfArt){
    console.log(pieceOfArt);
  })
  .catch(function() {
    console.log('err');
  })

Artwork.create({
  image: "https://uploads1.wikiart.org/images/franz-xaver-winterhalter/portrait-of-lydia-schbelsky-baroness-stael-holstein.jpg",
  artist: "Franz Xaver Winterhalter German",
  artwork: [{
    title: "Potrait of Lydia Schabelsky, Baroness Stael-Holstein",
    year: 1805,
    medium: "Oil on canvas"
  }],
  tags: ["german", "oil"]
})
  .then(function(){
    console.log('yay!')
  })
  .catch(function(){
    console.log('boo.')
  })

artwork.save()
  .then(function(pieceOfArt) {
    console.log(pieceOfArt);
  })
  .catch(function() {
    console.log('error')
  })
