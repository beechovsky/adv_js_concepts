// functionscope vs block scope

if (5 > 4) {
    var secret = '12345';
}

secret; // returns '12345', as it's gloablly scoped, not scoped to a function

function a() {
    var anotherSecret = '54321';
}

anotherSecret; // Ref. error

// block scope limits access to things within brackets
// JS introduced this with let and const

if (5 > 4) {
    let moreSecrets = '123456789';
}

moreSecrets // ref error

// Exercise
// what will happen at log after loop?
function loop() {
    for(var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('final i: ' + i);
}

loop()
// assumption:
// since var allows leaky scope, it is available and = 5
// however, using let, the log would throw a reference error as the variable isn't available outside of the loop
function loop() {
    for(let i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('final i: ' + i);
}

loop()

// CORRECT



