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

Data in Closures is ignored by the Garbage Collector.

*Recall:* The JS engine, before we run code, already knows which functions have access to which variables because JS is lexically scoped (where the function is written/declared matters, not when it's invoked).

### Benefits
Closures have two primary benefits:
- They allow efficient memory management.
- Encapsulation

*See snippets/pillars/closures_\*.js*

## Prototypal Inheritance

### Background: Scheme + Java

## Resources
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
