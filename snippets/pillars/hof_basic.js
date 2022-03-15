// Consider regular, lower order functions.
// Imagine we need to create a login system.
// Here's a dummy that runs a while to simulate login processing.
function letMeIn(){
    let array = [];
    for (let i = 0; i < 10000000; i++) {
        array.push(i)
    }
    return 'access granted'
}

letMeIn() // > 'access granted'

// but, we need to let others log in:
function letTedIn(){
     let array = [];
    for (let i = 0; i < 10000000; i++) {
        array.push(i)
    }
    return 'access granted to Ted'
}

letTedIn()

// This isn't DRY!
// Params can help, but we're still using oridnary functions.
function letUserIn(user) {
 let array = [];
    for (let i = 0; i < 10000000; i++) {
        array.push(i)
    }
    return 'access granted for ' + user
}

letUserIn('Billy')

// Let's create another function to help out:
const giveAccessTo = (name) => 'access granted to ' + name
// rewrite the function above to us this:
function letUserIn(user) {
    let array = [];
    for (let i = 0; i < 10000000; i++) {
        array.push(i)
    }
    return giveAccessTo(user)
}

// We're now giving a function what data to use, instead of having a function for each bit of data.
// We have a little more flexibiltiy, and action is delayed until runtime.

// Let's use a Higher Order Function.
// Consider: What if we had an admin login?
// We could simply copy the above and add stuff to it:
function letAdminIn(admin) {
    let array = [];
    for (let i = 0; i < 50000000; i++) {
        array.push(i)
    }
    return giveACcessTo(admin)
}

// Or, we can be DRY and use HOFs.
// We can give the function data and tell it what to do.
// Let's separate what to do with a new function:
function authenticate(verify) {
    let array = [];
    for (i < 0; i < verify; i++){
            array.push(i)
    }
    return true;
}

function letPerson(person, fn) {
    if(person.level === 'admin') {
        fn(5000000) // longer process
    } else if(person.level === 'user') {
        fn(100000) // shorter process
    }
    return giveAccessTo(person.name)
}

// Let's grant access to Tim
letPerson({level: 'user', name: 'Tim'}, authenticate)
// Here, authenticate is being passed different values based on the level of the person.
// The larger value simply simulates/indicates a more complex process.
// Note the number passed to the function paramter is the verify paramter of the authenticate function.