'use strict'

const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./db/game.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the game database.');
    }
});

module.exports = db;

