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


