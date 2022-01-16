import ranking from "../components/card/Ranking";

const getGrid = async (location) => {
    console.log('api' + location.pathname);
    const response = await fetch('../api' + location.pathname);
    const jsonGrid = await response.json();
    return jsonGrid;
}

const getHistory = (page, size) => {
    return new Promise( (resolve, reject) => {
        fetch('api/history?page='+page+'&size='+size)
            .then(async (history) => {
                const jsonHistory = await history.json();
                resolve(jsonHistory);
            })
            .catch( (err) => reject(err));
    })
}
const isValidWord = async (word) => {
    return new Promise((resolve, reject) => {
        fetch('../api/play?word=' + word)
            .then(async (response) => {
                const jsonResponse = await response.json();
                if (jsonResponse.valid) {
                    resolve(jsonResponse.score);
                }
                resolve(jsonResponse.valid);
            })
            .catch((err) => reject(err));
    });
}
const logIn = async (credentials) => {
    let response = await fetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    console.log(response)
    if(response.ok) {
        const user = await response.json();
        return {username: user.username, id: user.id};
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch(err) {
            throw err;
        }
    }
}

const insertScore = async (record) => {
    await fetch('/api/insert-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
    });
}

const getRanking = async () => {
    return new Promise( async (resolve, reject) => {
        await fetch('api/ranking')
            .then(async (ranking) => {
                const jsonRanking = await ranking.json();
                resolve(jsonRanking);
            })
            .catch( (err) => reject(err));
    })

}

const logOut = async () => {
    await fetch('/api/session/current', { method: 'DELETE' });
}

export {getGrid, isValidWord, logIn, logOut, insertScore, getRanking, getHistory}