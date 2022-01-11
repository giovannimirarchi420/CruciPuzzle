const express = require('express')
const constants = require('./util/Constants.js');
const dictionary = require('./data/words_dictionary.js');
const letterGenerator = require('./util/LetterGenerator.js');
const dao = require('./util/DataDao.js');
const app = express()
const port = 3001


app.use(express.json());

app.get(constants.BASE_PATH, (req, res) => {
    res.send('Hello World!');
});

app.get(constants.BASE_PATH + constants.GET_DIFFICULTY, async (req, res) => {
    const gridSize = await dao.getGridSize(req.params.level);
    let grid = Array(gridSize.height).fill(null).map(()=>Array(gridSize.length).fill(null));

    for(let i = 0; i < gridSize.height; i++){
        for(let j = 0; j < gridSize.length; j++){
            grid[i][j] = letterGenerator.randomAtoZ();
        }
    }
    res.json(grid);
});

app.get(constants.BASE_PATH + constants.IS_VALID_WORD, async (req, res) => {
    if(dictionary.dictionary[req.query.word]){
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

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})