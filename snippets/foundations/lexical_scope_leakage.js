// 'use strict' - toggle this when running to see differing behavior
function weird() {
    height = 50; // Where is this located?
    return height;
}

weird() // returns 50

// Is `height` created in the variable environment of weird()'s execution context?
// NO.
// This is what is known as Leakage of Global Variables.
