const obj = {}

obj.__proto__ //returns Object prototype

obj.__proto__.__proto__ // what happens here?

// We get null.

const obj2 = {
    name: 'Sally'
}

obj2.hasOwnProperty('name') // true


obj2.hasOwnProperty('hasOwnProperty') // false - this belongs to Object, not obj2

function a() {

}

a().hasOwnProperty('call') // false
a().hasOwnProperty('bind') // false

a().hasOwnProperty('name') // true - function name is avaialbe to function; no need to go up chain

function multiplyBy5(num) {
    return num*5
}

multiplyBy5.__proto__ // returns base Function
