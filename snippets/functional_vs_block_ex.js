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
// using let, the log would throw a reference erro as teh variabel isn;t availbe outside of the loop
function loop() {
    for(let i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('final i: ' + i);
}

loop()

// CORRECT