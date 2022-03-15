// Exercise - exnted functionality of a built in object

// 1
// Date object - give it a new method .lastYear() which shows the last year in YYY format
// new Date('1900-10-10').lastYear() // 1899

// we can simply add to the Date construcor's prototype:
DataTransfer.prototype.lastYear = function() {
    return this.getFullYear() - 1;
}
new Date('1900-10-10').lastYear() // 1899

// NOTE: Cannot use arrow function - this is lexically scoped


// Bonus
// Modify map() to print 'O_O' at the end of each iteration
Array.prototype.map = function() {
    let arr = [];
    for (let i = o; i < this.length; i++) {
        arr.push((this[i] + 'O_O'))
    }

    return arr
}
console.log([1,2,3].map()) // 1O_O, 2O_O, 3O_O

// Obviously this is very dangerous. You don't want o modify exisitng JS methods.
// Also, using prototype this ay is old school, we can use class now.