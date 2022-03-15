function boo(string) {
    return function(name) {
        return function(name2) {
            console.log(`${string} ${name} ${name2}`)
        }
    }
}

// cleaner:
const boo2 = (string) => (name) => (name2) => console.log(`${string} ${name} ${name2}`)

boo2('hi')
boo2('hi')('yo')
boo2('hi')('yo')('bye')

// this is pwerful!
//consider:

const booString = boo('hi')

const booStringName = booString()

// we could, theoretically, wait YEARS, even though teh original function is off teh stack.
// recall: parameters are treated like varibles in varible envs, so they are also enlsed ion teh closure