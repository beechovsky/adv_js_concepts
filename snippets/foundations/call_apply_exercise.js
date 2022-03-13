// How would you implement this:
// const array = [1, 2, 3];

// function getMaxNumber(arr) {
//     // code
// }
//
// getMaxNumber(array) // should return 3

const array = [1, 2, 3];

function getMaxNumber(arr) {
    // either works
    // return Math.max.apply(null, arr); // remember the first arg is an object
    return Math.max.call(null, ...arr);
}

getMaxNumber(array)