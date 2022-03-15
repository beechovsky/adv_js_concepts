let dragon = {
    name: 'Smaug',
    fire: true,
    fight() {
        return 5 // damage
    },
    sing() {
        return `I am ${this.name}; breather of fiiiiiire!`
    }
}

dragon.sing()


let lizard = {
    name: 'Dave',
    fight() {
        return 1 // damage
    }
}

// we can borrow from thr dragon with bind() to amke the lizard more powerful:

const singingLizard = dragon.sing.bind(lizard)

console.log(singingLizard.sing())

/// Hmmm. But, the lizard doesnt actually breathe fire. Let's fix that:
let dragon2 = {
    name: 'Smaug',
    fire: true,
    fight() {
        return 5 // damage
    },
    sing() {
        if (this.fire) {
            return `I am ${this.name}; breather of fiiiiiire!`
        }
    }
}

dragon.sing()

const singingLizard2 = dragon.sing.bind(lizard)
console.log(singingLizard2.sing())

// ah! Undefined.


// What if we want to borrow moreproerties? Prototypal Inheritance.
lizard.__proto__ = dragon;
lizard.sing() // awesome.

// Why does the lizard breathe fire now? Beacuse it also inherited the ability to breathe fire from the fire: true prop.
// Why doesn't the damage increase in fight()? Because the lizard has it's own fight definition, there's no need for the engine to look up the prototype chain.
// When calling a method not defined in one object, the engine will look up the protoype chain for that method or property.

for (let prop in dragon) {
    console.log(prop);
}

// This will list all the props, including inherited.

// What if we want to see only lizard props?
for (let prop in dragon) {
    if (lizard.hasOwnProperty(prop)) {
        console.log(prop);
    }
}
