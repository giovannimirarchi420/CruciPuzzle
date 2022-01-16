const express = require('express')
const constants = require('./util/Constants.js');
const dictionary = require('./data/words_dictionary.js');
const letterGenerator = require('./util/LetterGenerator.js');
const dao = require('./util/DataDao.js');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const app = express()
const port = 3001


app.use(express.json());

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy( function (email, password, done) {
        dao.getUser(email, password)
            .then((user) => {
                if (!user) {
                    console.log("check not passed")
                    return done(null, false, {message: 'Incorrect username and/or password.'});
                }
                return done(null, user);
        });
    }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser(async (id, done) => {
    await dao.getUserById(id)
        .then(user => {
            return done(null, user); // this will be available in req.user
        }).catch(err => {
        return done(err, false);
    });
});

app.use(session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
}));

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if(req.isAuthenticated()) {
        next();
        return;
    }

    res.status(401).json({ error: 'not authenticated'});
}

/* Routes */

app.get(constants.BASE_PATH + constants.GET_DIFFICULTY, async (req, res) => {
    const gridSize = await dao.getGridSize(req.params.level);
    let grid = Array(gridSize.height).fill(null).map(() => Array(gridSize.length).fill(null));

    for (let i = 0; i < gridSize.height; i++) {
        for (let j = 0; j < gridSize.length; j++) {
            grid[i][j] = letterGenerator.randomAtoZ();
        }
    }
    res.json(grid);
});

app.get(constants.BASE_PATH + constants.IS_VALID_WORD, async (req, res) => {
    if (dictionary.dictionary[req.query.word]) {
        res.status(200).json({
            valid: true,
            score: req.query.word.length
        });
        return;
    }
    res.status(200).json({
        valid: false,
        score: 0
    });
});

app.post(constants.BASE_PATH + constants.LOGIN, function(req, res, next) {
    passport.authenticate('local',(err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);
            return res.json(req.user);
        });
    })(req, res, next);
});

app.post( constants.BASE_PATH + "/insert-score", isLoggedIn, (req, res) => {
    dao.insertScore(req.body.username, req.body.score, req.body.id, req.body.date)
        .then( () => res.status(201).end())
        .catch( (err) => console.log(err));
})

app.delete(constants.BASE_PATH + constants.LOGOUT, (req, res) => {
    req.logout();
    res.end();
});

app.get(constants.BASE_PATH + constants.RANKING, (req, res) => {
    dao.getRanking()
        .then( (result) => res.status(200).json(result))
        .catch( (err) => res.status(400).end());
})

app.get(constants.BASE_PATH + constants.HISTORY,isLoggedIn, (req, res) => {
    let { page, size } = req.query;
    console.log(page,size, req.user.id)
    if (!page) page = 1;
    if (!size) size = 4;
    dao.getHistory(page, size, req.user.id)
        .then( (rows) => {
            console.log(rows);
            res.status(200).json(rows)
        })
        .catch( (err) => res.status(400).end());


})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})