// Pass by Value
var a = 5;
var b = 10;

// has an address where 5 is located in memory. Same with b and 10.

var b = a; // b now equals 5, and the value b knows the address for is updated. the value a knows the address for is unchanged.
b++;

console.log(a) // 5
console.log(b) // 6

// Pass by Reference
let obj1 = {
    name: 'Yao',
    password: '123'
}

let obj2 = obj1
obj2.password = 'easy'

console.log(obj1)
console.log(obj2)

// Both passwords were overwritten, due to an object's pass by reference.
// obj1 and obj2 point to the same place in memory, so changes to one affects the other.


// Arrays
var c = [1,2,3,4,5]
var d = c;


d.push(73491029)

console.log(c) // also updated as Arrays are objects