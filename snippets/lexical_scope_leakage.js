// 'use strict' - toggle this when running to see differing behavior
function weird() {
    height = 50; // where is this located?
    return height;
}

weird() // returns 50

// Is height created in variable environment of weird()'s execution context?
// NO.
// this is Leakage of Global Variables.
