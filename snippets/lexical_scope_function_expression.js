var heyhey = function doodle() {
    return 'heyhey'
}

heyhey() // > 'heyhey'

// what happens if we run doodle()?
doodle() // > Reference error: doodle is not defined

// doodle() is not in the scope chain
// doodle() is enclosed in its own scope
// it is added to its own execution context's variable environment
// only available inside heyhey()
// thus limits to going back 'up' scope chain

// The descirption above, from the course, feels incomplete.
// Since heyhey is a function expression, it isn't hoisted fully.
// I suspect there's a connection between, or at least a consideration of, hoisting and lexical env/scope that isn't clear from the course.