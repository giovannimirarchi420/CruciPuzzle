/**
 * @param: A matrix of boolean meaning the current selection
 * @return An object like:
 *          {
 *              head: {
 *                  i: 0,
 *                  j: 3
 *              },
 *              tail: {
 *                  i: 3,
 *                  j:0
 *              }
 *          }
 * */
const getHeadAndTail = (matrix) => {
    let head;
    let tail;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === true) {
                if (!head) {
                    head = {i: i, j: j};
                } else {
                    tail = {i: i, j: j};
                    break;
                }
            }
        }
    }
    return swap(head, tail);
}

const setHeadAndTail = ({head, tail}, grid) => {
    grid = grid.map((row) => row.map((element) => element = false));
    console.log(head, tail);
    grid[head.i][head.j] = true;
    grid[tail.i][tail.j] = true;
    console.log("head:");
    console.log(head);
    console.log("tail:");
    console.log(tail);
    return grid;
}

const swap = (head, tail) => {
    if (head.i > tail.i) {
        let tmp = head;
        head = tail;
        tail = tmp;
    } else {
        if (head.j > tail.j) {
            let tmp = head;
            head = tail;
            tail = tmp;
        }
    }
    return {head, tail};
}

const areOnTheSameRow = (head, tail) => head.i === tail.i;
const areOnTheSameCol = (head, tail) => head.j === tail.j;

const isDiagonal = (head, tail) => {
    if (head.j < tail.j) {
        for (let index = {i: head.i, j: head.j}; (index.i <= tail.i && index.j <= tail.j); index.i++, index.j++) {
            if (index.i === tail.i && index.j === tail.j) {
                return true;
            }
        }
    } else {
        console.log("check diag");
        for (let index = {i: head.i, j: head.j}; (index.i <= tail.i && index.j >= tail.j); index.i++, index.j--) {
            if (index.i === tail.i && index.j === tail.j) {
                return true;
            }
        }
    }
    return false;
}
const getColumnSelection = (head, tail) => {
    let toReturn = [];
    for (let index = (0 + head.i); index <= tail.i; index++) {
        toReturn = toReturn.concat({
            i: index,
            j: head.j
        })
    }
    return toReturn;
}

const getRowSelection = (head, tail) => {
    let toReturn = [];
    for (let index = (0 + head.j); index <= tail.j; index++) {
        toReturn = toReturn.concat({
            j: index,
            i: head.i
        })
    }
    return toReturn;
}

const getDiagonalSelection = (head, tail) => {
    let toReturn = [];
    if (head.j < tail.j) {
        for (let index = {i: head.i, j: head.j}; (index.i <= tail.i && index.j <= tail.j); index.i++, index.j++) {
            toReturn = toReturn.concat({
                i: index.i,
                j: index.j
            })
        }
    } else {
        for (let index = {i: head.i, j: head.j}; (index.i <= tail.i && index.j >= tail.j); index.i++, index.j--) {
            toReturn = toReturn.concat({
                i: index.i,
                j: index.j
            })
        }
    }

    console.log(toReturn);
    return toReturn;
}

const getNullSelection = (head, tail) => {
    console.log("head || tail = ");
    console.log(head || tail);
    return [head || tail];
}


export {
    getHeadAndTail,
    areOnTheSameRow,
    areOnTheSameCol,
    getColumnSelection,
    getRowSelection,
    isDiagonal,
    setHeadAndTail,
    swap,
    getDiagonalSelection,
    getNullSelection
};