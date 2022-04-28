const express = require('express');

// required routes for our api/html

// initializes app and creates a port
const app = express();
const PORT = process.env.PORT || 3001;

// TODO: set up body parsing, static, and route the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// starts the server on the port
app.listen(PORT, () => console.log('This port is listening at ${PORT}'));