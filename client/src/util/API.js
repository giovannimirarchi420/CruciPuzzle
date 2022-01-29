const getGrid = async (location) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('../api' + location.pathname);

        if (response.status !== 200) {
            reject();
        }
        const jsonGrid = await response.json();
        resolve(jsonGrid);
    })
}

const getHistory = (page, size) => {
    return new Promise((resolve, reject) => {
        fetch('api/history?page=' + page + '&size=' + size)
            .then(async (history) => {
                const jsonHistory = await history.json();
                resolve(jsonHistory);
            })
            .catch((err) => reject(err));
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
    if (response.ok) {
        const user = await response.json();
        return {username: user.username, id: user.id};
    } else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        } catch (err) {
            throw err;
        }
    }
}

const insertScore = async (record) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('/api/insert-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
        });
        if (response.status === 201) {
            resolve();
        }
        reject();
    });
}

const getRanking = async () => {
    return new Promise(async (resolve, reject) => {
        await fetch('api/ranking')
            .then(async (ranking) => {
                if (ranking.status !== 200) {
                    reject()
                }
                const jsonRanking = await ranking.json();
                resolve(jsonRanking);
            })
            .catch((err) => reject(err));
    })
}

const logOut = async () => {
    await fetch('/api/session/end', {method: 'DELETE'});
}

export {getGrid, isValidWord, logIn, logOut, insertScore, getRanking, getHistory}