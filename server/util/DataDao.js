const db = require('../db/db')
const bcrypt = require('bcrypt');

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

exports.getUserById = (id) => {
    return new Promise( (resolve, reject) => {
        const sql = "SELECT * FROM USERS WHERE ID = ?";
        db.get(sql, [id], (err, out) => {
            if(err){
                reject(err);
                return;
            }
            if (out == undefined){
                return resolve('User not found');
            }
            const user = {id: out.id, email: out.email, username: out.username}
            resolve(user);
        })
    })
}

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM USERS WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined) {
                resolve(false);

            }
            else {
                const user = {id: row.id, username: row.USERNAME, email: row.EMAIL};
                // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
                bcrypt.compare(password, row.PASSWORD).then(result => {
                    if(result) {
                        resolve(user);
                    }
                    else
                        resolve(false);
                });
            }
        });
    });
};

exports.insertScore = (username, score, id, date) => {
    return new Promise( (resolve, reject) => {
        const sql = "INSERT INTO GAMES (username, score, user_id, date) VALUES (?, ?, ?, ?)";
        db.get(sql, [username, score, id, date], (err, out) => {
            if(err){
                reject(err);
                return;
            }
            resolve('Inserted');
        })
    })
}

exports.getRanking = () => {
    return new Promise( (resolve, reject) => {
        const sql = "SELECT * FROM GAMES ORDER BY SCORE DESC LIMIT 5";
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            resolve(rows);
        })
    })
}

exports.getHistory = (page, size, userId) => {
    return new Promise( (resolve, reject) => {
        const sql = "SELECT * FROM GAMES WHERE user_id = ? ORDER BY DATE DESC LIMIT ? OFFSET ?";
        db.all(sql, [userId, size, size*page], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            resolve(rows);
        })
    })
}