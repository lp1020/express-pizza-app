// Write your model in this file!
const db = require('../db/config');

const Pizza = {};

Pizza.findAll = () => {
  return db.query('SELECT * FROM pizza');
}

Pizza.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM pizza
    WHERE id = $1
    `, [id]);
}

Pizza.destroy = (id) => {
  return db.none(`
    DELETE FROM pizza
    WHERE id = $1
    `, [id]);
}

Pizza.create = pizza => {
  return db.one(
    `
    INSERT INTO pizza
    (flavor, description, location)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [pizza.flavor, pizza.description, pizza.location]
    );
};

Pizza.update = (quote, id) => {
  return db.one(`
    UPDATE pizza SET
    flavor = $1,
    description = $2,
    location = $3
    WHERE id = $4
    RETURNING *
    `, [pizza.flavor, pizza.description, pizza.location, id]);
}

module.exports = Pizza;
