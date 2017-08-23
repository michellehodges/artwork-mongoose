const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const server = express();

let Artwork = require('./mongoose');

server.engine('mustache', mustache());
server.set('views', './views');
server.set('view engine', 'mustache');
server.use(express.static('views'));
server.use(bodyparser.urlencoded( { extended: false }));

mongoose.connect('mongodb://localhost:27017/collections');

server.get('/', function(req, res) {
  Artwork.find()
    .then(function(art) {
      res.render('index', {
        collection: art,
        artwork: art,
      })
    })
    .catch(function() {
    });
});


server.post('/add', function(req, res) {
  Artwork.create( {
    artist: req.body.artist,
    artwork: [{
      title: req.body.title,
      year: req.body.year,
      medium: req.body.medium
    }]
  })
    .then(function(){
      console.log('information was added.')
      res.redirect('/');
    })
    .catch(function(err) {
      console.log(err);
      res.status(500);
    })
})

server.post('/delete/:id', function(req, res) {
  console.log(req.params.id)
  Artwork.deleteOne({ _id: req.params.id })
    .then(function(){
      console.log('information was deleted')
      res.redirect('/');
    })
    .catch(function(){
      console.log('didnt delete nuttin')
    })
})

server.listen(3000, function() {
    console.log('Mad successes happenin here!');
  });
