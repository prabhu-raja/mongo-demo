// * Before starting parallely run `mkdir -p ~/data/db && mongod --dbpath ~/data/db` 
const mongoose = require('mongoose');
const debugBasic = require('debug')('mongo:basic');

mongoose.connect('mongodb://localhost/playground')
  .then(() => debugBasic('Connected to MongoDB 🌱'))
  .catch(err => debugBasic('Error in connecting 🍃', err));
