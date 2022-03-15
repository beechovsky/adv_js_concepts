function a() {

}

a.__proto__ // what will we see?

// >f () {[native code]}
// this is the Function object our function inherited from
// We can go deeper:

a.__proto__.__proto__

// return the Object method listing

// What about an Object?
const obj = {}

obj.__proto__ // returns Bas Object listing, since our Object variable was inherited from that base Object.