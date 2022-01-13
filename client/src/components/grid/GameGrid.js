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
import ScoreCounter from "../ScoreCounter.js";


const GameGrid = (props) => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [newSelection, setNewSelection] = useState(true);
    const [redCells, setRedCells] = useState([]);
    const [setup, setSetup] = useState(props.setup);
    const [score, setScore] = useState(0);
    const location = useLocation();

    const isActive = (i, j) => {
        return selectedCells.some((cell) => cell.i === i && cell.j === j);
    }

    const isRed = (i, j) => {
        return redCells.some((cell) => cell.i === i && cell.j === j);
    }

    useEffect(() => {
        getGrid(location)
            .then((grid) => setSetup(() => [...grid]));
    }, [location]);

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
            console.log("valid");
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

    return (
        <>
            <table style={{marginTop:"10vh"}}>
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
        </>
    );
}

export default GameGrid;