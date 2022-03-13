function two() {
    var isValid; // hoisted as, and remains at calling, undefined
}

function one() {
    var isValid = true; // local variable environment
    two(); // new execution context at runtime
}

var isValid = false;
one();

// two(), called by one(), has an undefined isValid var.
// This will display here when run.
