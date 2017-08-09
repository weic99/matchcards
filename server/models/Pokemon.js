const mongoose = require('mongoose');
// Complete the pokemonSchema below.
const pokemonSchema = mongoose.Schema({
  number: { type: Number, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  types: { type: [ String ], required: true },
  imageUrl: { type: String, required: true }
});
 
// Register the pokemonSchema with Mongoose as the 'Pokemon' collection.
const Pokemon = module.exports = mongoose.model('Pokemon', pokemonSchema);
 
 module.exports.add = (pokemon, callback) => {
   pokemon.save((err, pokemon) => {
     if (err) {
       callback(err, null);
     } else {
       callback(null, pokemon);
     }
   });
 };
 
 module.exports.all = (callback) => {
   Pokemon.find({}, (err, pokemons) => {
     if (err) {
       callback(err, null)
     }
     callback(null, pokemons);
   });
 };
 
 module.exports.getOne = (number, callback) => {
   Pokemon.findOne({
     number: number
   }, (err, pokemon) => {
     if (err) {
       callback(err, null);
     } else {
       callback(null, pokemon);
     }
   });
 };
