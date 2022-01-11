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


const GameGrid = (props) => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [newSelection, setNewSelection] = useState(true);
    const [redCells, setRedCells] = useState([]);
    const [setup, setSetup] = useState(props.setup);
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
            setRedCells((selectedWords) => {
                return [...selectedWords, ...selection];
            });
        }
    }

    return (
        <>
            <table>
                <tbody>
                {
                    setup.map((row, i) => {
                        return (
                            <tr key={i}>{
                                row.map((element, j) => {
                                    return <td key={`${i}${j}`}><Square red={isRed(i, j)} key={`${i}${j}`} i={i} j={j}
                                                                        value={element}
                                                                        selected={isActive(i, j)}
                                                                        refreshGrid={refreshGrid}/></td>;
                                })
                            }</tr>);
                    })
                }
                </tbody>
            </table>
        </>
    );
}

export default GameGrid;