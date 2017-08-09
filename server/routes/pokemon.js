const pokemonRoutes = require('express').Router();

const Pokemon = require('../models/Pokemon');

pokemonRoutes.route('/')
  // route for getting all pokemons
  .get( (req, res) => {
    Pokemon.all((err, pokemons) => {
      if (err) throw err;
      if (pokemons) {
        res.json({
          pokemons: pokemons
        });
      } else {
        res.json({
          pokemons: null
        });
      }
    });
  });

module.exports = pokemonRoutes;