// Ex. 1
// returns Window in a browser console - the Global Execution Context
this

// Ex. 2
function a() {
    console.log(this)
}

// what happens when we call a()?
a()

// it also returns the Window, since `this` refers to the object
// the function a() is a property of.

// Ex. 3
function b() {
    'use strict'
    console.log(this)
}

// what happens when we invoke b()?
b()

// It returns 'undefined', as 'use strict' doesn't allow
// percolating up to global environment
// NOTE: The explanation for this was terrible. Look it up.

// Ex 4.
const obj1 = {
    name: 'Billy',
    sing: function() {
        // this function is a property of obj
        return 'lalala ' + this.name
    }
    // or:
    // sing() {
    //     return 'lalala ' + this.name
    // }
}

obj.sing()

// Ex. 5
const obj2 = {
    name: 'Billy',
    sing: function() {
        // this function is a property of obj
        return 'lalala ' + this.name
    },
    singAgain: function() {
        return this.sing() + '!!!'
    }
}

// Ex. 6
// execute same code for mulitple objects
function importantPerson() {
    console.log(this.name)
}

// importantPerson() === window.importantPerson,
// and the `this` in that function is referring to the Window object
// but, we can use it with other objects:
const name = 'Sunny';
const obj3 = {
    name: 'Jeff',
    importantPerson: importantPerson // ta-da!
    // now, `this` will reference obj3, thobject to which this function call belongs
}

importantPerson() // returns 'Sunny'
obj3.importantPerson() // 'Jeff'