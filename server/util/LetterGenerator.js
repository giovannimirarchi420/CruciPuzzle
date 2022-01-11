
/** English language alphabet. */
const letters = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'q', 'r', 's', 't',
    'u', 'v', 'w', 'x',
    'y', 'z'
];

/**
 * English language cumulative letter frequencies × 100000.
 * @see http://en.wikipedia.org/wiki/Letter_frequency
 */
const frequencies = [
    8167,  9659,  12441, 16694,
    29396, 31624, 33639, 39733,
    46699, 46852, 47624, 51649,
    54055, 60804, 68311, 70240,
    70335, 76322, 82649, 91705,
    94463, 95441, 97801, 97951,
    99925, 100000
];

/**
 * Return a random letter from a - z according to their relative
 * frequencies in the English language.
 *
 * @return {string} random letter from a - z.
 */
exports.randomAtoZ = () => {
    let random = Math.random() * 100000;
    for (let i = 0, length = letters.length; i < length; i++) {
        if (random < frequencies[i]) {
            return letters[i];
        }
    }
}