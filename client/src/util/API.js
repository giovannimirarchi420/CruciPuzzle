const getGrid = async (location) => {
    console.log('api' + location.pathname);
    const response = await fetch('../api' + location.pathname);
    const jsonGrid = await response.json();
    return jsonGrid;
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

export {getGrid, isValidWord}