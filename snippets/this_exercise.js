var b = {
    name: 'Jeff',
    say() {
        console.log('b', this)
    }
}

var c = {
    name: 'Jeff',
    say() {
        return function() {
            console.log('c', this)
        }
    }
}

var d = {
    name: 'Jeff',
    say() {
        return () => {
            console.log('d', this)
        }
    }
}

// What do we think the log values will be?
// Assumptions:
// b = obj b, because say() belongs to b
// c = window, as there are no controls for this's dynamic scope in place
//   and say isn't returning this, it's returning a function, which when retunred from another method is evaluated by window
// d =  obj d, since the arrow function enforces lexical scope

b.say() // Correct
c.say() // returns [Function]
c.say()() // returns window object
d.say() // [Function]
d.say()() // returns d object
