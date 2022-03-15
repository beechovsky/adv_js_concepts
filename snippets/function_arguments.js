// arguments keyword and object added to each execution context except the global context

function india() {
    console.log(arguments); // arguments object
    console.log('hot');
}

india()

function india2(...args) {
    console.log(arguments); // arguments object
    console.log(args); // array of args; easier to work with
    console.log('hot');
}

india2()