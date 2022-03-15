let view;
function initialize() {
    view = 'ocean';
    console.log('view has been set!');
}


// initialize is in global scope - how do we keep people from abusing it?
// we only want it run once, but a new dev has run it a bunch and reset the view

initialize();
initialize();
initialize();
console.log('view');

// Let's make it a function that can only be called once.
// REMEMBER: RETURN A FUNCTION FROM ANOTHER FUNCTION TO CREATE CLOSURE
// naive:
function init2() {
    // use a call counter
    let called = 0
    return function() {
        if(called > 0){
            return
        } else {
            view = 'ocean';
            console.log('view is set!')
            called++;
        }
    }
}

const startOnce = init2();
startOnce();
startOnce();
startOnce();
startOnce();
console.log('view');