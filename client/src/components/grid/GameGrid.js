import Square from './Square';
import {
    areOnTheSameCol,
    areOnTheSameRow,
    getColumnSelection,
    getDiagonalSelection,
    getHeadAndTail,
    getNullSelection,
    getRowSelection,
    isDiagonal,
    setHeadAndTail,
    swap
} from "../../util/MatrixUtil";
import {useState} from "react";

const selection = [[false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]];

const GameGrid = (props) => {
    const [selectionGrid, setSelectionGrid] = useState(selection);
    const [initialState, setInitialState] = useState(true);
    const [moveHeadOrTail, setMove] = useState(true); //true -> move head, false -> move tail
    const [selectedElements, setSelectedElements] = useState([]);
    let [head, setHead] = useState({});
    let [tail, setTail] = useState({});

    const refreshGrid = (row, col) => {
        if (initialState) {
            setSelectionGrid((grid) => {
                grid[row][col] = true
                return grid;
            })
            setHead({i: row, j: col});
            setInitialState(false);
            setMove(false);
            setSelectedElements([{i: row, j: col}]);
            return;
        }

        if (moveHeadOrTail) { //true -> head
            setHead({i: row, j: col});
            head = {i: row, j: col}
            tail = undefined;
            setTail(undefined);
            setMove(false);
            setSelectionGrid((grid) => {
                grid[row][col] = true
                return grid;
            })
            setSelectedElements([{i: row, j: col}]);
            return;
        } else {
            tail = {i: row, j: col};
            setTail({i: row, j: col});
            setMove(true);
        }
        const headAndTail = swap(head, tail);
        head = headAndTail.head;
        tail = headAndTail.tail;
        setHead(headAndTail.head);
        setTail(headAndTail.tail);
        const grid = setHeadAndTail(swap(head, tail), selectionGrid);
        console.log("new grid selected");
        setSelectionGrid((oldState) => {
            return grid
        });
        setSelectedElements(() => select(grid));
    }

    const select = (grid) => {
        let {head, tail} = getHeadAndTail(grid);
        const headAndTail = swap(head, tail);
        head = headAndTail.head;
        tail = headAndTail.tail;
        //row
        if (areOnTheSameRow(head, tail)) {
            return getRowSelection(head, tail);
        }
        //col
        if (areOnTheSameCol(head, tail)) {
            return getColumnSelection(head, tail);
        }
        //diagonal
        if (isDiagonal(head, tail)) {
            console.log("IS DIAGONAL");
            return getDiagonalSelection(head, tail);
        }
        return getNullSelection(head, tail);
    }

    const isActive = (i, j, toSelects) => {
        for (let k = 0; k < toSelects.length; k++) {
            if (toSelects[k].i === i && toSelects[k].j === j) {
                return true;
            }
        }
        return false;
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
                                                                        selected={isActive(i, j, selectedElements)}
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