const swap = (head, tail) => {
    if (head.i > tail.i) {
        let tmp = head;
        head = tail;
        tail = tmp;
    }
    return {head, tail};
}

const areOnTheSameRow = (head, tail) => head.i === tail.i;
const areOnTheSameCol = (head, tail) => head.j === tail.j;

const isDiagonal = (head, tail) => {
    ({head, tail} = swap(head, tail));
    if (head.j < tail.j) {
        for (let index = {i: head.i, j: head.j}; (index.i <= tail.i && index.j <= tail.j); index.i++, index.j++) {
            if (index.i === tail.i && index.j === tail.j) {
                return true;
            }
        }
    } else {
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
    if (head.i > tail.i) {
        let tmp = head;
        head = tail;
        tail = tmp;
    }
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
    if (head.j > tail.j) {
        let tmp = head;
        head = tail;
        tail = tmp;
    }
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
    ({head, tail} = swap(head, tail));
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

    return toReturn;
}

const getWord = (selection, grid) => {
    const word = selection.map((element) => {
        return grid[element.i][element.j];
    });
    console.log(word.join(""));
    return word.join("");
}


export {
    areOnTheSameRow,
    areOnTheSameCol,
    getColumnSelection,
    getRowSelection,
    isDiagonal,
    swap,
    getDiagonalSelection,
    getWord
};