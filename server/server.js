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

/*** set up Passport ***/
passport.use(new LocalStrategy( function (email, password, done) {
        dao.getUser(email, password)
            .then((user) => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username and/or password.'});
                }
                return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    await dao.getUserById(id)
        .then(user => {
            return done(null, user);
        }).catch(err => {
        return done(err, false);
    });
});

app.use(session({
    secret: 'asupersecretsetenceguessme',
    resave: false,
    saveUninitialized: false
}));
/*** end set up Passport ***/

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
        return;
    }

    res.status(401).json({ error: 'not authenticated'});
}

/* Routes */

// api/play/:level
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
// api/play?word=
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

// api/session
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

// api/insert-score
app.post( constants.BASE_PATH + constants.INSERT_SCORE, isLoggedIn, (req, res) => {
    dao.insertScore(req.body.username, req.body.score, req.body.id, req.body.date)
        .then( () => res.status(201).end())
        .catch( (err) => res.status(400));
})

// api/session/end
app.delete(constants.BASE_PATH + constants.LOGOUT, (req, res) => {
    req.logout();
    res.end();
});

// api/ranking
app.get(constants.BASE_PATH + constants.RANKING, (req, res) => {
    dao.getRanking()
        .then( (result) => res.status(200).json(result))
        .catch( (err) => res.status(400).end());
})

// api/history
app.get(constants.BASE_PATH + constants.HISTORY,isLoggedIn, (req, res) => {
    let { page, size } = req.query;
    if (!page) page = 1;
    if (!size) size = 4;
    dao.getHistory(page, size, req.user.id)
        .then( (rows) => {
            res.status(200).json(rows)
        })
        .catch( (err) => res.status(400).end());


})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})