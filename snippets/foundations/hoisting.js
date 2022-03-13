// Ex. 1
console.log('1-------');

console.log(teddy); // undefined, beacus eonly the variable name of teddy has been hoisted
var teddy = 'bear';

console.log(sing); // evaluates without error due to functions being fully hoisted
function sing() {
    console.log('ohhh la la la');
}

// Ex. 2
var one = 1;
var one = 2;

// What happenss if we log `one` to console? We see '2'.
// During hoisting, one is 'undefined'.
// At runtime, the last value stored there is used.

function a() {
    console.log('hi');
}

function a() {
    console.log('bye');
}

// Functions are fully hoisted, so even though the first definition was hoisted, the second function replaces (overwrites in memory) the first.

// Ex. 3
var favFood = 'smoked beef'; // partially hoisted

var foodThoughts = function() {
    // also partially hoisted, as it's a function expression
    // but also a new execution context and lexical env upon landing on stack
    // favFood belongs to previous context + lexical environment
    // thus, undefined
    console.log("Favorite food: " + favFood);

    // here, however, favFood is bound to this context
    var favFood = 'biscuits';
    console.log('New favorite food: ' + favFood);
}

foodThoughts(); // first log returns undefined, second returns 'biscuits'

// But wait - shouldn't the Scope Chain reach back up to the parent,
// in this case Global, lexical environment and to find favFood?
// Let's see what happens if foodThoughts is declared, instead of a function expression.

// Ex. 3a
var favFood = 'smoked beef'; // partially hoisted

function foodThoughts() {
    // now foodThoughts is fully hoisted, as it's a declared function
    // still get a new execution context upon landing on stack
    // favFood belongs to previous context + lexical environment
    // however, this is still undefined
    console.log("Favorite food: " + favFood);
    // hoisting differently did NOT affect the Scope Chain here.
    // here, however, favFood is bound to this context
    var favFood = 'biscuits';
    console.log('New favorite food: ' + favFood);
}

foodThoughts();

// Ex. 3b - EUREKA!
// The fact that a var named faveFood exists in the nested/child context & lex. env. keeps the engine from
// looking back "up" through the scope chain. If you remove teh var from teh foodThoughts function, it will print the initial, global definition each time.
var favFood = 'smoked beef'; // partially hoisted

function foodThoughts() {
    // now foodThoughts is fully hoisted, as it's a declared function
    // still get a new execution context upon landing on stack
    // favFood belongs to previous context + lexical environment
    console.log("Favorite food: " + favFood);
    // var favFood
    console.log('New favorite food: ' + favFood);
}

foodThoughts();

// Ex. 4
function bigBrother() {
  function littleBrother() {
    return 'it is me!';
  }
  return littleBrother();
  function littleBrother() {
    return 'no me!';
  }
}

  // Before running this code, what do you think the output is?
  bigBrother();

  // Assumption:
  // The bigBrother() function is fully hoisted, meaning the definition is hoisted in addition to just the name.
  // The internal functions are also fully hoisted - in memory before runtime.
  // At runtime, the value from invoking littleBrother() should be the most recent value in memory.
  // So, we'll see 'no me!'.

  // CORRECT!

  // NOTE: a new, nested execution context is created upon invoking littleBrother(),
  // but the value it returns is already in memory for retrieval,
  // and we didn't use locally scoped "var", so no worry about reference errors in this scope.
