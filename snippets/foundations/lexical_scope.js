function sayMyName() {
    var a = 'a';
    return function findName() {
        // findName()'s lexical environment is sayMyName()
        var b = 'b';
        return function printName() {
            // printName()'s lexical environment is findName()
            var c = 'c';
            return 'Jeff';
        }
    }
}

// access nested functions via lexical scope
sayMyName() // > findName()
// returns:
// ƒ findName() {
//     var b = 'b';
//     return function printName() {
//         var c = 'c';
//         return 'Jeff';
//     }
// }

sayMyName()() // > printName()
// returns
// ƒ printName() {
//     var c = 'c';
//     return 'Jeff';
// }

sayMyName()()() // > 'Jeff'
// returns 'Jeff'