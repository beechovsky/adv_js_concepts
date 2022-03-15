// How would you create your own .bind() method using call or apply?

// bind is a Function method, so start there:
Function.prototype.bind = function(needy) {
    // good start - now what?
    // we need references to two things - the object that needs teh bound method, and the object that has it
    const self = this; // object that has the needed function, upon which bind() is called
    // what is the parameter to bind()? It's the object that needs the mod, so let's use a paramter here, too. See anonymous function signature.
    return function() {
        // we can then pass the needy object to applay or call
        // but is that enough?
        // no - we need to supply bind's arguments as well
        return self.apply(needy, arguments)
    }
}