// How do we safely create prototypes?

let human ={
    mortal: true
}

let socrates = Object.create(human)
console.log(socrates) // empty object

socrates.age = 45;
