import Square from "./Square.js";
import {useEffect, useState} from "react";
import {
    areOnTheSameCol,
    areOnTheSameRow,
    getColumnSelection,
    getDiagonalSelection,
    getRowSelection,
    getWord,
    isDiagonal
} from "../../util/MatrixUtil.js";
import {useLocation} from "react-router-dom";
import {getGrid, insertScore, isValidWord} from "../../util/API.js";
import ScoreCounter from "./ScoreCounter.js";
import Score from "./Score";
import StopButton from './StopButton.js'
import dayjs from "dayjs";
import ErrorModal from "../modals/ErrorModal.js";


const GameGrid = (props) => {
    const GAME_TIME = 60;
    const [selectedCells, setSelectedCells] = useState([]);
    const [newSelection, setNewSelection] = useState(true);
    const [redCells, setRedCells] = useState([]);
    const [setup, setSetup] = useState(props.setup);
    const [score, setScore] = useState(0);
    const [isFinish, setFinish] = useState(false);
    const [isLogged, setLogged] = useState(props.isLogged);
    const [timer, setTimer] = useState(GAME_TIME);
    const [foundWords, setFoundsWord] = useState([]);
    const [error, setError] = useState(false);
    const location = useLocation();

    //true if the cell [i, j] is present in the array
    const isPresent = (i, j, array) => {
        return array.some((cell) => cell.i === i && cell.j === j);
    }

    //get data grid from BE
    useEffect(() => {
        getGrid(location)
            .then((grid) => {
                setSetup(() => [...grid])
            })
            .catch(() => setError(true));
    }, [location]);

    //game time
    useEffect(() => {
        setTimeout(() => {
            setFinish(true);
            setTimer(0);
        }, GAME_TIME * 1000);
    }, []);

    //game time
    useEffect(() => {
        if (timer > 0 && !isFinish)
            setTimeout(() => {
                setTimer((timer) => timer - 1);
            }, 1000);

    }, [timer]);

    //insert score
    useEffect(() => {
        if (isLogged && isFinish) {
            insertScore({
                score: score * getLevelContextInfo(location).difficultyLevel,
                username: props.user.username,
                id: props.user.id,
                date: dayjs().format('DD/MM/YYYY')
            })
                .catch(() => setError(true));
        }
    }, [isFinish]);

    const refreshGrid = (i, j) => {
        let selection = [];
        if (newSelection) {
            selection = [{i: i, j: j}];
            setSelectedCells([{i: i, j: j}]);
            setNewSelection(false);
            setSelectionIfValid(selection, setup);
            return;
        }

        if (areOnTheSameRow(selectedCells[0], {i: i, j: j})) {
            selection = getRowSelection(selectedCells[0], {i: i, j: j});
            setSelectedCells(selection);
            setNewSelection(true);
            setSelectionIfValid(selection, setup);
            return;
        }

        if (areOnTheSameCol(selectedCells[0], {i: i, j: j})) {
            selection = getColumnSelection(selectedCells[0], {i: i, j: j});
            setSelectedCells(selection);
            setNewSelection(true);
            setSelectionIfValid(selection, setup);
            return;
        }

        if (isDiagonal(selectedCells[0], {i: i, j: j})) {
            selection = getDiagonalSelection(selectedCells[0], {i: i, j: j});
            setSelectedCells(selection);
            setNewSelection(true);
            setSelectionIfValid(selection, setup);
            return;
        }

        setSelectedCells([{i: i, j: j}]);
        selection = [{i: i, j: j}];
        setSelectionIfValid(selection, setup);
    }

    const setSelectionIfValid = async (selection, setup) => {
        const word = getWord(selection, setup);
        if (await isValidWord(word) && word.length > 1 && !foundWords.includes(word)) {
            setScore((score) => score + word.length);
            setRedCells((selectedWords) => {
                return [...selectedWords, ...selection];
            });
            setFoundsWord((words) => [...words, word]);
        }
    }

    const getLevelContextInfo = (location) => {
        if (location.pathname.includes("beginner")) return {buttonSize: "100px", fontSize: "50px", difficultyLevel: 1};
        if (location.pathname.includes("rookie")) return {size: "85px", fontSize: "35px", difficultyLevel: 2};
        if (location.pathname.includes("intermediate")) return {size: "55px", fontSize: "25px", difficultyLevel: 3};
        if (location.pathname.includes("command")) return {size: "35px", fontSize: "15px", difficultyLevel: 4};
        if (location.pathname.includes("god")) return {size: "30px", fontSize: "15px", difficultyLevel: 5};
    }

    return (
        <center>
            <>{error ? <ErrorModal show={true}/> : <>
            <h3 style={{marginTop: "5vh"}} className={"font-game"}>{timer}</h3>
            <table style={{marginTop: "5vh"}}>
                <tbody>
                {
                    setup.map((row, i) => {
                        return (
                            <tr key={i}>{
                                row.map((element, j) => {
                                    return <td key={`${i}${j}`}><Square red={isPresent(i, j, redCells)} key={`${i}${j}`} i={i} j={j}
                                                                        value={element}
                                                                        selected={isPresent(i, j, selectedCells)}
                                                                        refreshGrid={refreshGrid}
                                                                        buttonSize={getLevelContextInfo(location).buttonSize}
                                                                        fontSize={getLevelContextInfo(location).fontSize}/></td>;
                                })
                            }</tr>);
                    })
                }
                </tbody>
            </table>

            <center><ScoreCounter score={score}/></center>
            <Score username={props.user.username} islogged={isLogged.toString()} show={isFinish}
                   score={score * getLevelContextInfo(location).difficultyLevel}/>
            <StopButton finishGame={setFinish} isLogged={isLogged}/></>}
            </>
        </center>
    );
}

export default GameGrid;