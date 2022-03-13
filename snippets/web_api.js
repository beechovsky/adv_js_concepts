// Ex. 1
console.log('1');
setTimeout(() => {console.log('2'), 1000});
console.log('3');

// The JS Engine won't recognize setTimeout(), and thus sends it to the Web API
// In addition to the timeout, the processing is delayed because the Event Loop
// is waiting for the Call Stack to empty before placing the callback
// (the console log) back into it.


// Ex. 2
// Same as above but shows the timeout value doesn't matter;
// the callback won't run until the Call Stack is empty, which won't happen until the final console log is run.
console.log('4');
setTimeout(() => {console.log('5'); 0});
console.log('6');