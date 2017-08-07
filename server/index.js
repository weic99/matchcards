const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Connect to mongoDB
const config = require('./config/mongo');
mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

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
const users = require('./routes/users');
app.use('/api/users', users);

app.get('*', (req, res) => {
  res.send('hello');
});

// Start server
const server = app.listen(port, () => {
  console.log('Server started on port ', port);
});