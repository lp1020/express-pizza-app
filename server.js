//connect express to the server and set it to variable "express"
const express = require('express');
//connect 'morgan' and set it to variable "logger"
const logger = require('morgan');
//connect the server to 'path' and set it to variable "path"
const path = require('path');
//connect the server to 'body-parser' and setting it to variable "bodyParser"
const bodyParser = require('body-parser');
//initialize the app with express
const app = express();
//set the port
const PORT = process.env.PORT || 3000;
//tell the app where to serve
app.listen(PORT, () => {
  //display results in the console
  console.log(`listening on port ${PORT}!`);
});
//initialize morgan
app.use(logger('dev'));
//initialize express with the directory named 'public'
app.use(express.static(path.join(__dirname, 'public')));
//initialize bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//index route to display in browser on page load
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//connect server with pizza-routes module and set it to variable "pizzaRoutes"
const pizzaRoutes = require('./routes/pizza-routes');
//initalize '/pizza' in the url to display information from the pizza-routes module
app.use('/pizza', pizzaRoutes);
//catches errors in the browser url and gives it a 404 status with message 'Invalid route!'
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid route!',
  });
});
