// If you run the code below, it throws an error.
// How can we fix this?
// const character = {
//     name: 'Simon',
//     getCharacter() {
//         return this.name;
//     }
// };

// const giveMeTheCharacterNOW = character.getCharacter;
// this should return the character but doesn't:
// console.log('?', giveMeTheCharacterNOW());

// use bind, and pass global this so this globally scoped function can use it
const character = {
    name: 'Simon',
    getCharacter() {
        return this.name;
    }
};

//const giveMeTheCharacterNOW = character.getCharacter.bind(null);
//const giveMeTheCharacterNOW = character.getCharacter.bind(null);
const giveMeTheCharacterNOW = character.getCharacter.bind(character);

console.log('?', giveMeTheCharacterNOW());