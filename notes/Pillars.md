# Notes from Javascript: The Advanced Concepts
 *https://www.udemy.com/course/advanced-javascript-concepts/*

## The Two Pillars of JavaScript: Closures and Prototypal Inheritance
**NOTE:** Much of the background presented was pretty wrote and fluffy, so I'm skipping nost of it excpet for helpful reminders and summaries.

### Function Refresher
*Recall:* Functions are Objects
// We can add new properties to functions:
    function woohoo(){
        console.log ('woohoo');
    }
    woohoo.yell = 'ahhhh';

When functions are invoked, we get `this` and `arguments`.

*Aside:* We technically don't need parameters in a function definition, and can access whatever parameters we send when calling the function from `arguments`.

There are multiple ways of invoking a function:
- Calling it directly: `one()`
- As a method:
```
const obj = {
    two: function() {
       return 2;
    }
}

obj.two()
```
- `call` and `apply`:
```
function three() {
    return 3;
}

three.call() // === three()
```

#### Function Constructors - Create Functions for You
```
cont four = new function('return 4')
four() // -> 4
```
We can pass parameters:
```
const four = new function('num', 'return num')
four(4) // -> 4
```
### Callable Object
Under the hood, JS creates a special object called a *Callable Object* when a function is declared.

Function (Callable) Objects have:
- code
- name (optional - recall anonymous functions)
- methods: call, apply, and bind

What about regular objects? Do they have those same properties?

Create an object in your console and try to access its properties - they aren't the same.

### First Class Citizens
Function are *First Class Citizens* in JavaScript, which means 3 things:
- Functions can be assigned to variables/properties
    - `var stuff = function(){}`
- Functions can pass functions as arguments
    -     function a(fn) {
             fn()
          }
- Functions can return functions as values
    - ```
      function b(){
          return function c() {console.log('yo')}
      }
      b() // -> function c
      b()() // 'yo'
      var d = b()
      d()
      ```

This opens up JS to functional programming!

### Extra Bits with Functions
Parameters are automatically added to a function's executino context's variable environment (remember that gotcha exercise?).

Default paramters were introduced in ES6.
- `function a(num=2, name='Jeff') {}`

### Background: Higher Order Functions
A *Higher Order Function* (HOF) is a function that can take a function as an argument or a function that returns another function.

How are they useful?
HOFs can give a function both data and instructions for what to do with it at invocation.

*See snippets/pillars/hof\*.js*

## Closures
Born of two concepts:
- Functions are First Class Citizens
- Lexical Scope - the engine knows, based on where code is written, before running, what variables each function has access to.

A Closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).

In other words, a Closure gives you access to an outer function's scope from an inner function. In JavaScript, *closures are created every time a function is created, at function creation time.*

So, inner functions have access to the variables of outer functions.

Closures allow a function to access variables from the enclosing scope *even after it leaves the scope in which it was declared.*

Data in Closures is ignored by the Garbage Collector. Any variables in the closure of a function are kept in memory as long as there is a way to reference that function.

*Recall:* The JS engine, before we run code, already knows which functions have access to which variables because JS is lexically scoped (where the function is written/declared matters, not when it's invoked).

### Benefits
Closures have two primary benefits:
- Efficient memory management.
- Encapsulation

### Closures as Function Factories
Consider the following code from MDN:
```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
`add5` and `add10` are both closures. They share the same function body definition, but store different lexical environments. In `add5`'s lexical environment, `x` is 5, while in the lexical environment for `add10`, `x` is 10.

Closures are useful because they let you associate data (the lexical environment) with a function that operates on that data.

You can use a closure anywhere that you might normally use an object with only a single method.

Consider this slightly more usful example:
```
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```
`size12`, `size14`, and `size16` are now functions that resize the body text to 12, 14, and 16 pixels, respectively. You can attach them to buttons (in this case hyperlinks) as demonstrated in the following code example.
```
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```
```
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

*See snippets/pillars/closures_\*.js*

## Prototypal Inheritance
Recall: Arrays and Functions are just Objects

Inheritance is an Object getting access to the properties and methods of another Object.
The Array object has acccess to the methods and properties of teh base Object.

So do functions.

Run the folling in a console:
```
const array = []
array.__proto__
```
You'll see a list of methods - Array methods. Our variable is ingerited from ARrary, and we went up the prototype chain to see the Array Object's methods.

We can go further up the prototype chain:
`array.__proto__.__proto__`
Running this shows a differnt list - the methods of the base JS Object.

Other languages has Inheritance, but they mostly use Classical Inheritance. JavaScript uses Prototypal Inheritance.

What's the difference?

There are no Classes in JavaScript - only Prototypal Inheritance. Yes, there is a `class` keyword, but that is syntactic sugar.

Recall: We can us bind() to borrow aspects of one Object in another. What if we want to borrow many properties from adeep/large object?

We can add the object we need features of to our new object's prototype chain:

`lizard.__proto__ = dragon;`

#### `isPrototypeOf()`
Allows checking whether an object is a prototype of another.
`dragon.isPrototypeOf(lizard); // true`

The engine didn't find the method in `dragon`, and went up the prototype chain into object to find it.

Prototypes are Superclasses in other languages.

NOTE: Protoyping does NOT copy properties andmethods to the inheriting class. The engine will simply look up the prototype chain for them.

Why don't we see `__proto__` everywhere?
It's bad for performance, and there are better ways to inherit. Never manually assign to chains.
To safely create a prototype, use `Object.create(<object we're inheriting from>)`.

Why is all this useful?
Since objects can share prototpyes, they share properties pointg to the same place in memory.
We could create hundreds of lizards from the examples above, and all of their inherited properties refer to the same location in memory.

#### The Prototype property
Unsurprisingly, `__proto__` is simply a pointer to the `prototype` property of teh Object being inherited from.

Example:
```
function a() {}
a().__proto__ // returns f() {...}
Function.prottype // also returns f() {...}
```

NOTE: Only functions have the protoype property.
When we create functions, they are given prototype.

The only time we use them is with Constructor Functions.

But we can run `Object.prototype`!

`typeof Object // returns 'function'`

`Object` is the *Object Constructor* that creates an object wrapper. The object constructor is a function, so it gets a prototype property.

To perform an action, we need a function.



### Background: Scheme + Java

## Resources
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
