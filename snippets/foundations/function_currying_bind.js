// Ex. 1
function multiply(a, b) {
    return a*b;
}

// currying via bind
let multiplyByTwo = multiply.bind(this, 2)

console.log(multiplyByTwo(4)) // returns 8

let multiplyByTen = multiply.bind(this, 10)

console.log(multiplyByTen(5)) // 50