// call(), apply(), and bind()
// under the hood, all functions use call()
function a() {
    console.log('hi')
}

a.call() // === a()
// apply() will do the same thing (in this case)
a.apply()

// Ex. 1 - call()
const wizard = {
    name: 'Merlin',
    health: 100,
    heal() {
        return this.health = 100;
    }
}

wizard.heal()

const archer = {
    name: 'Robin',
    health: 30
}

// we can borrow from wizard! DRY!
// using call()
console.log('archer before: ', archer)
wizard.heal.call(archer) // first arg is object to target
console.log('archer after: ', archer)

// Ex. 2 - call() w/ params
const wizard2 = {
    name: 'Gandalf',
    health: 1000,
    heal(hp) {
        return this.health += hp;
    }
}

const archer2 = {
    name: 'Legolas',
    health: 300
}
console.log('archer before: ', archer2)
wizard2.heal.call(archer2, 23) // first arg is object to target
console.log('archer after: ', archer2)

// Ex. 3 - apply() - takes an Array of params
const wizard3 = {
    name: 'Raistlin',
    health: 1000,
    heal(hp) {
        return this.health += hp;
    }
}

const archer3 = {
    name: 'Sturm',
    health: 300
}
console.log('archer before: ', archer3)
wizard3.heal.apply(archer3, [23]) // first arg is object to target
console.log('archer after: ', archer3)

// Ex. 4 - bind()
const wizard4 = {
    name: 'Dr. Strange',
    health: 1000,
    heal(hp) {
        return this.health += hp;
    }
}

const archer4 = {
    name: 'Hawkeye',
    health: 300
}
console.log('archer before: ', archer4)
wizard4.heal.bind(archer4, [23])
console.log('archer after: ', archer4)

// that didn't work because bind returns a function, whic we can use later on:
const healArcher = wizard4.heal.bind(archer4, 23)

console.log('archer before: ', archer4)
healArcher()
console.log('archer after: ', archer4)
// Recall: Bind is a bandaid to fix the dynamic scope of `this` keyword
