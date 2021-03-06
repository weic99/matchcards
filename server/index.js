const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Connect to mongoDB
const config = require('./config/mongo');
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
  console.log('Populate database with Pokemons');
  require('./insertAllPokemon');
});

console.log('Loading test');
require('./test');
console.log('Done');

// Server setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
const usersRoutes = require('./routes/users');
const pokemonRoutes = require('./routes/pokemon');
app.use('/api/users', usersRoutes);
app.use('/api/pokemon', pokemonRoutes);

app.get('*', (req, res) => {
  res.send('hello');
});

// Start server
const server = app.listen(port, () => {
  console.log('Server started on port ', port);
});