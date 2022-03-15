function a() {
    let grandpa = 'grandpa'
    return function b() { // we've created a closure
        let father = 'father'
        return function c() { // we've created another closure
            let son = 'son'
            return `${grandpa} > ${father} > ${son}`
        }
    }
}

// a and b are higher order, c is normal
a() // returns {Function: b]
a()() // returns [Function: c]
a()()() // 'grandpa > father > son'

// Why did function c() remembwr what grandpa, or father, was?

const one = a(); // a is popped off stack - it's execution context and variable environment is gone!
// Shouldn't granpda be garbage collected since a() is gone?
// NOPE! grandpa and father are in a closure - the GC leaves it Alone
// When we run c(), when father and granpa aren't found in c()'s variable environment,
// the engine instead looks into the closure (checks the lexical scope) and not the global environment.

// Important: because c() is *inside a function*, the JS engine will create a closure of the variables in the surrouding envs.
