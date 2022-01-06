import Square from "./Square";
import {useState} from "react";
import {
    areOnTheSameCol,
    areOnTheSameRow,
    getColumnSelection,
    getDiagonalSelection,
    getRowSelection,
    isDiagonal
} from "../../util/MatrixUtil";


const GameGrid = (props) => {
    const [selectedCells, setSelectedCells] = useState([]);
    const [newSelection, setNewSelection] = useState(true);

    const isActive = (i, j) => {
        return selectedCells.some((cell) => cell.i === i && cell.j === j);
    }

    const refreshGrid = (i, j) => {
        if (newSelection) {
            setSelectedCells([{i: i, j: j}]);
            setNewSelection(false);
            return;
        }

        if (areOnTheSameRow(selectedCells[0], {i: i, j: j})) {
            setSelectedCells(getRowSelection(selectedCells[0], {i: i, j: j}));
            setNewSelection(true);
            return;
        }

        if (areOnTheSameCol(selectedCells[0], {i: i, j: j})) {
            setSelectedCells(getColumnSelection(selectedCells[0], {i: i, j: j}));
            setNewSelection(true);
            return;
        }

        if (isDiagonal(selectedCells[0], {i: i, j: j})) {
            setSelectedCells(getDiagonalSelection(selectedCells[0], {i: i, j: j}));
            setNewSelection(true);
            return;
        }

        setSelectedCells([{i: i, j: j}]);
    }

    return (
        <>
            <table>
                <tbody>
                {
                    props.setup.map((row, i) => {
                        return (
                            <tr key={i}>{
                                row.map((element, j) => {
                                    return <td key={`${i}${j}`}><Square key={`${i}${j}`} i={i} j={j} value={element}
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