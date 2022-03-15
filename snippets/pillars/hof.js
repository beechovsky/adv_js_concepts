// Higher Order Fucntions example
// lets make a generic function we can make other functions from
// like multyplyByTwo, multiplybyTen, etc.

const multiplyBy = function(num1) {
    return function(num2) {
        return num1*num2
    }
}

// currying!
const multiplyByTwo = multiplyBy(2)
multiplyByTwo(2) // 4

// 'cleaner' with arrow functions:
const multBy2 = (num1) => (num2) => num1*num2
multBy2(4)(4) // 16