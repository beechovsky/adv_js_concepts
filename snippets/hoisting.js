// Ex. 1
console.log('1-------');

console.log(teddy); // undefined
var teddy = 'bear';

console.log(sing); // evaluates without error due to hoisting
function sing() {
    console.log('ohhh la la la');
}

// Ex. 2
var one = 1;
var one = 2;

// What happenss if we log `one` to console? We see '2'.
// During hoisting, one is 'undefined'.
// At runtime, the current value stored there is used.

function a() {
    console.log('hi');
}

function a() {
    console.log('bye');
}

// Functions are fully hoisted, so the second function def replaces (overwrites in memory) the first.

// Ex. 3
var favFood = 'smoked beef'; // partially hoisted

var foodThoughts = function() {
    // also partially hoisted
    // but also a new execution context upon landing on stack
    // favFood belongs to previous context + lexical environment
    // thus, undefined
    console.log("Favorite food: " + favFood);

    // here, however, favFood is bound to this context
    var favFood = 'biscuits';
    console.log('New favorite food: ' + favFood);
}

foodThoughts();

// Ex. 4
function bigBrother(){
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
