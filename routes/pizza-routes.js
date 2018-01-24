//connect express to 'pizza-routes' module
const express = require('express');
//initializes new instance of the express router
const pizzaRoutes = express.Router();
//connect pizza-controller module and give it variable name "pizzaController"
const pizzaController = require('../controllers/pizza-controller');
//root route in url
pizzaRoutes.get('/', pizzaController.index);
//post route in url
pizzaRoutes.post('/', pizzaController.create);
//put route with id in url to edit db
pizzaRoutes.put('/:id', pizzaController.update);
//route in url with id number to only display the item in db with matching id
pizzaRoutes.get('/:id', pizzaController.show);
//delete route to delete items from db
pizzaRoutes.delete('/:id', pizzaController.destroy);

//export the pizzaRoutes files
module.exports = pizzaRoutes;
