import Square from "./Square";
import {useEffect, useState} from "react";
import {
    areOnTheSameCol,
    areOnTheSameRow,
    getColumnSelection,
    getDiagonalSelection,
    getRowSelection,
    getWord,
    isDiagonal
} from "../../util/MatrixUtil";
import {useLocation} from "react-router-dom";
import {getGrid, isValidWord} from "../../util/API";
import ScoreCounter from "./ScoreCounter.js";
import Score from "./Score";
import {insertScore} from '../../util/API'
import StopButton from './StopButton'
import dayjs from "dayjs";


const GameGrid = (props) => {
    const GAME_TIME = 10;
    const [selectedCells, setSelectedCells] = useState([]);
    const [newSelection, setNewSelection] = useState(true);
    const [redCells, setRedCells] = useState([]);
    const [setup, setSetup] = useState(props.setup);
    const [score, setScore] = useState(0);
    const [isFinish, setFinish] = useState(false);
    const [isLogged, setLogged] = useState(props.isLogged);
    const [timer, setTimer] = useState(GAME_TIME);
    const location = useLocation();

    const isActive = (i, j) => {
        return selectedCells.some((cell) => cell.i === i && cell.j === j);
    }

    const isRed = (i, j) => {
        return redCells.some((cell) => cell.i === i && cell.j === j);
    }

    //get data grid from BE
    useEffect(() => {
        getGrid(location)
            .then((grid) => setSetup(() => [...grid]));
    }, [location]);

    //game time
    useEffect(() => {
        setTimeout(async () => {
            setFinish(true);
        }, GAME_TIME*1000);
    }, []);

    //game time
    useEffect(() => {
        if(timer > 0)
            setTimeout( () => {
                setTimer((timer) => timer-1);
            }, 1000);
    }, [timer]);

    useEffect(() => {
        console.log(props.user.username, props.user.id, calculateDifficultyIntegerLever(location), isLogged, isFinish);
        if(isLogged && isFinish) {
            insertScore({
                score: score * calculateDifficultyIntegerLever(location),
                username: props.user.username,
                id: props.user.id,
                date: dayjs().format('DD/MM/YYYY')
            })
                .catch((err) => console.log(err));
            console.log("inserted");
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
        console.log(redCells);
    }

    const setSelectionIfValid = async (selection, setup) => {
        const word = getWord(selection, setup);
        if (await isValidWord(word) && word.length > 1) {
            setScore((score) => score+word.length);
            setRedCells((selectedWords) => {
                return [...selectedWords, ...selection];
            });
        }
    }

    const calculateSize = (location) => {
        if(location.pathname.includes("beginner")) return "100px";
        if(location.pathname.includes("rookie")) return "85px";
        if(location.pathname.includes("intermediate")) return "55px";
        if(location.pathname.includes("command")) return "35px";
        if(location.pathname.includes("god")) return "30px";
    }

    const calculateFontSize = (location) => {
        if(location.pathname.includes("beginner")) return "50px";
        if(location.pathname.includes("rookie")) return "35px";
        if(location.pathname.includes("intermediate")) return "25px";
        if(location.pathname.includes("command")) return "15px";
        if(location.pathname.includes("god")) return "15px";
    }

    const calculateDifficultyIntegerLever = (location) => {
        if(location.pathname.includes("beginner")) return 1;
        if(location.pathname.includes("rookie")) return 2;
        if(location.pathname.includes("intermediate")) return 3;
        if(location.pathname.includes("command")) return 4;
        if(location.pathname.includes("god")) return 5;
        return 1;
    }

    return (
        <>
            <h3 style={{marginTop: "5vh"}} className={"font-game"}>{timer}</h3>
            <table style={{marginTop:"5vh"}}>
                <tbody>
                {
                    setup.map((row, i) => {
                        return (
                            <tr key={i}>{
                                row.map((element, j) => {
                                    return <td key={`${i}${j}`}><Square red={isRed(i, j)} key={`${i}${j}`} i={i} j={j}
                                                                        value={element}
                                                                        selected={isActive(i, j)}
                                                                        refreshGrid={refreshGrid}
                                                                        buttonSize={calculateSize(location)}
                                                                        fontSize={calculateFontSize(location)}/></td>;
                                })
                            }</tr>);
                    })
                }
                </tbody>
            </table>

            <center><ScoreCounter score={score}/></center>
            <Score username={props.user.username} isLogged={isLogged} show={isFinish} score={score * calculateDifficultyIntegerLever(location)}/>
            <StopButton finishGame={setFinish} isLogged={isLogged}/>
        </>
    );
}

export default GameGrid;