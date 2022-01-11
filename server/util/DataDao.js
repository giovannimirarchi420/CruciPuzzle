const db = require('../db/db')

exports.getLetterFrequency = (letter) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT FREQUENCY FROM FREQUENCY WHERE LETTER = ${letter}`;
        db.all(sql, [], (err, out) => {
            if (err) {
                reject(err);
                return;
            }
            const frequency = out;
            resolve(frequency);
        });
    });
};

exports.getLetterFrequencies = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM FREQUENCY";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

exports.getGridSize = (description) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT HEIGHT, LENGTH FROM DIFFICULTY WHERE DESCRIPTION = ?";
        db.get(sql, [description], (err, out) => {
            if (err) {
                reject(err);
                return;
            }
            if (out === undefined) {
                resolve({error: 'Size not found.'});
            }
            const size = {height: out.HEIGHT, length: out.LENGTH};
            resolve(size);
        });
    });
}