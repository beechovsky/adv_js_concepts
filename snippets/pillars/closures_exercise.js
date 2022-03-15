// Exercise
function callMeMaybe() {
    const callMe = 'Hi! I am here!';
    setTimeout(function() {
        console.log(callMe);
    }, 4000);
}

callMeMaybe() // prints after 4s

// Closures were invoked here!
// Recall - setTimeout gets offloaded to the Web API while execution continues.
// The calling function is off the stack - its execution context and variable environment are gone!
// This happened before the event loop sent the anonymous function back from the webapi but - callMe was defined inside the anonymous function's lexical scope,
// and is thus enclosed in it's closure, so the value remains accessible!

// Exercise 2:
// What if we move the const declaration after the setTimeout?
function callMeMaybe() {
    setTimeout(function() {
        console.log(callMe);
    }, 4000);
    const callMe = 'Hi! I am here!';
}

callMeMaybe()

// Will the fucntion call still print the value of callMe?

// Yes - they are both in the same lexical constext
// NOTE: const doesn't get hoisted.