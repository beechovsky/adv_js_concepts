// Ex. 1
const a = function() {
    console.log('a', this) // window
    const b = function() {
        console.log('b', this) // still window; effectively window.a(b())
        const c = {
            hi: function() {
                console.log('c', this) // new object c
            }
        }
        c.hi()
    }
    b()
}
a()

// this is dynamic - who called what?
// window called a(), window called b(), c called hi()

// Ex. 2
const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var anotherFunc = function() {
            console.log('b', this)
        }
        anotherFunc()
    }
}

// what happens when we call obj.sing()?
// this is not lexically scoped - doesn't matter where it was written
// what matters is how function is called

// Ex. 3
// how do we avoid this?
// arrow functions - lexically bound
// Ex. 2
const obj2 = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var anotherFunc = () => {
            console.log('b', this)
        }
        anotherFunc()
    }
}

// Ex. 4
// how do we do this without arrow functions?
// bind()
const obj3 = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var anotherFunc = () => {
            console.log('b', this)
        }
        return anotherFunc.bind(this)
    }
}
// try this with both obj3,sing() and obj3.sing()()

// Ex. 5
// how do we do this without arrow functions or bind()?
// var self = this;
// used in angular 1 or jQuery
const obj4 = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var self = this;
        var anotherFunc = () => {
            console.log('b', self)
        }
        return anotherFunc
    }
}
// try this with both obj3,sing() and obj3.sing()()