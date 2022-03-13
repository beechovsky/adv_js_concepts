// function execution context contains arguments object
function marry(person1, person2) {
    console.log(arguments);
    return `${person1} is now married to ${person2}`
}

// this won't work, since we weren't granted arguments at the global context:
arguments // undefined