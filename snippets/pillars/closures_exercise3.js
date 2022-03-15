const array = [1,2,3,4];
for (var i=0; i < array.length; i++) {
    setTimeout(function() {
        console.log('Index: ' + i)
    }, 3000)
}

// what will be the output from this code?
// it will show index 4 each iteration! Why? And how can we fix this?

// solutions:
//easiest: use let instead of var
for (let i=0; i < array.length; i++) {
    setTimeout(function() {
        console.log('Index: ' + i)
    }, 3000)
}

// let allows us to use block scoping - the block of the loop beacoms a scope fore ach i
// var was in global scope - by the time the function returned from web api teh loop had run to the end already

// what if we can tuse let?
// we can use closures, even with 'var':
// use an IIFE with a param of i
for (var i=0; i < array.length; i++) {
    (function(closureI) {
        setTimeout(function() {
            console.log('Index: ' + closureI)
        }, 3000)
    })(i); // inside the IIFE, we can ref i, and it wont be removed from local scope
}