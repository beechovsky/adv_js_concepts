// Objects revisited - cloning
let obj1 = {
    a: 'a',
    b: 'b',
    c: 'c'
}

// We don't want Pass by Reference if we want a new Object we can edit without mucking with the original (and vice versa).
let clone = Object.assign({}, obj1)
obj1.c = 5
console.log(clone) // clone unaffected

clone.c = 23
console.log(obj1) // obj3 unaffected

// we can also use the spread operator
let clone2 = {...obj1}
clone2.a = 12345
console.log(clone)

// What if an object has a nested object as a property?
let obj2 = {
    a: 'a',
    b: 'b',
    c: {
        deep: 'try to copy'
    }
}

// c means there's another pass by reference value, another object in memory
let clone3 = Object.assign({}, obj2)
let clone4 = {...obj2}

// obj2.c = 23
// console.log(obj2)
// console.log(clone3)
// console.log(clone4)

// only obj2 is affected

// BUT! What if we update the deep object?
// Comment out the above changes and logs and run again with these.
obj2.c.deep = 'got \'em!'
console.log(obj2)
console.log(clone3)
console.log(clone4)

// AH!
// The nested object property was not cloned,
// so while the parent objects are exist at different places in memory,
// all of their object properties are still pointing to the same place.
// This is shallow cloning.

// Deep Copy/clone
let superClone = JSON.parse(JSON.stringify(obj2))

obj2.c.deep = 'take that!'
console.log(obj2)
console.log(clone3)
console.log(clone4)
console.log(superClone) // still 'got 'em!'