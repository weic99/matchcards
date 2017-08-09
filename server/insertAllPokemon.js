const pokemons = require('./data/pokemon.json');
const Pokemon = require('./models/Pokemon');

// Fill in the definition of insertAllPokemon so that when 
// this file is run in the terminal with `node insertAllPokemon.js`, 
// all 151 pokemon are inserted into the database
const insertAllPokemon = () => {
  //console.log('insertAllPokemon is called');
  pokemons.forEach( (pokemon) => {
    const newPokemon = new Pokemon({
      number: pokemon.number,
      name: pokemon.name,
      types: pokemon.types,
      imageUrl: pokemon.imageUrl
    });
    
    Pokemon.add(newPokemon, (err, pokemon) => {
      if (err) {
        //console.log('Failed to add', newPokemon.name);
      } else {
        //console.log(newPokemon.name + ' added');
      }
    });
  });
};

// NOTE: DO NOT invoke this function as part of your
// server code - it is meant to only be run once so that
// you have access to data to work with
insertAllPokemon();
