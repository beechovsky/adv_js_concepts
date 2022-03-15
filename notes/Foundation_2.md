# Notes from JavaScript: The Advanced Concepts
 *https://www.udemy.com/course/advanced-javascript-concepts/*

## Foundations, Part 2
**NOTE: This section jumps around a bit, so the notes may not follow the course exactly as I tried to create a more natural flow.**

### How JavaScript Executes
The JavaScript engine creates an ***execution context*** upon each function call.
Each function in the calls stack has its own execution context, an internal construct to track execution of a function or the global code.

Remember the Call Stack? That's actually the Execution Context Stack.

### Global Execution Context (GEC)
Base Context (on page load, for instance)
First item on the stack.
Provides `Global` object (often `Window`) and associated `this` keyword.

`this === window`

### Phases of Execution
*Creation Phase*
- Creation of GEC
*Execution Phase*
- Runs code

### Lexical Environment
Per execution context, there exists an internal engine construct that holds identifier-variable mapping.
- Identifier === name of variables/functions
- Variable, in this case === is the reference to actual object (including function type object) or primitive value

### Hoisting
The part of Creation Phase where the JavaScript engine allocates memory for the variables and functions it sees in creation phase before execution.
- AKA: Moving variables & functions to the top of respective envs during compilation
Engine cued by `var`, `function` keywords.

*See snippets/hoisting* snippets*

### Variable and Function Hoisting
Variables are not fully hoisted - only the variable name is stored.

`const` and `let` are not hoisted.

*Declared* functions are fully hoisted (name and definition are stored), function *expressions* are not.

### Function Expressions and Hoisting
*Example function expression:*
`var someFunction = function() {
    // do something
}`

Defined at runtime - stored the same as a variable defined with `var`. See more below.

Understanding hoisting provides a way to optimize memory use.

Hoisting also means it's easy to accidentaly refer to things before they're properly defined.

**Recommendation:** Avoid hoisting
How?
- Avoid `var` unless absolutely necessary (when you actually need a global variable);
- use `let` and `const` instead
    - see scoping below

*Aside:*
Not hoisting means more dynamically allocating memory versus pre-loading memory before execution, no?

*See snippets/hoisting.js*

## Function Invocation
### Function Expression and Declaration
Declaration - fully hoisted, defined at *parse time*:
`function hawaii() {
    console.log('hot');
}`

Expression - not fully hoisted, defined at *runtime*:
`var canada = function() {
    console.log('Cold here');
}`

or:
`var canada = () => {
    console.log('Cold here');
}`

### Function Invocation Execution Context
Function Execution Contexts are granted `this` keyword again, but also `arguments`, which is exactly what it sounds like - an object containing function args.

*See snippets/function_invocation* snippet(s).*

*Recall:*
Using arguments is suboptimal/dangerous.
Looks like an Array, but isn't (it's an indexed mapping of some sort that is difficult/costly to access).

Things you can do with arguments are hard to optimize.
Recent JS (6) introduces tools to limit use of arguments.
But, we may need access to/iterate over function arguments.
So, use `Array.from(arguments)` instead. This allows use of Array methods on arguments.

**Default Parameters** (ES6) - allows use of spread operator:
`function(...args) {
    // blah
}`

*Aside:*
(...args) seems insecure as you can send anything to a function with that signature, no? maybe they're ognored, but until they're garbage collected they're pollution at best.

*NOTE:*
Why, exactly, `arguments` is inefficient to work with, other than not having Array methods, isn't explained. **TODO: LOOK UP**

### Variable Environment
What about variables created inside a function?
Each function's execution context has its own variable environment in addition to `this` and `arguments`. These are variables accessible only to the function they're defined in - they belong to the Lexical Environment of that function call's Execution Context.

*See snippets/variable_env.js*

### Scope Chain
Each lexical environment also holds a reference to a parent lexical environment. These links comprise the Scope Chain.
This outer environment depends on where the function sits lexically. If a variable accessed in a function isn't found within that function's execution context's variable environment, it goes up the scope chain looking for it.

Lexical Scope = Static scope (as opposed to Dynamic scope)
Lexical Scope = available data + variables where function is *defined*, not where it's *invoked*
Lexical Scope determines what variables are available, not where the function is called (dynamic scope).

*Recall:*
`eval()` and `with` are dangerous because you can alter scope and scope chains.

### Function Lexical Environment
A variable declared inside of a function belongs to that functions's Lexical Environment.
- Variable, in this case === is the reference to actual object (including function type object) or primitive value
Functions have a reference to their lexical environment: `[[Environment]]`

*See snippets/lexical_scope.js*

### `[[scope]]`
Lexical environment === `[[scope]]` in the JavaScript specification.
Property of every function - visible in Chrome console.

### Wait ... What?
**Summary:**
When a function is invoked, including the creation of the Global object, an Execution Context is created and added to the Stack. Execution Contexts, which track execution, have corresponding Lexical Environments, which contain mappings of variables and functions defined within that context as well as a reference to their parent lexical environments. Those links constitute the Scope Chain.
*Execution Contexts and Lexical Environments are actual JavaScript constructs.*
*Scope is a concept referring to the visibility of variables and functions to executing code.* A variable or function is 'in scope' if it is within the current lexical environment OR in the lexical environment chain (Scope Chain) of the enclosing function.

### TODO: Compare `[[Scopes]]` and `[[Environment]]` properties

### Leakage of Global Variables
Referencing previously undefined variables in JS may not break, because JS looks at the variable, recognizes it hasn't seen `var`, then goes up Scope Chain all the way to Global environment and looks for the variable.
If the engine sees it doesn't exist, it will create it for you.

*Unless:*
Enter `'use_strict'`
- prevents JS from doing unpredicatble things on edge cases

*See snippets/lexical_scope_leakage.js and snippets/lexical_scope_function_expression.js*

### Function Scope vs. Block Scope
The main difference is scoping rules. Variables declared by `var` keyword are scoped to the immediate function body (hence the function scope) while `let` variables are scoped to the immediate enclosing block denoted by { } (hence the block scope).

Doesn't mean you can never use `var`, but in most cases you can probably use `let` or `const`.

Example:
```
function run() {
  var foo = "Foo";
  let bar = "Bar";

  console.log(foo, bar); // Foo Bar

  {
    var moo = "Mooo"
    let baz = "Bazz";
    console.log(moo, baz); // Mooo Bazz
  }

  console.log(moo); // Mooo
  console.log(baz); // ReferenceError
}

run();
```
The reason why let keyword was introduced to the language was function scope is confusing and was one of the main sources of bugs in JavaScript.
Here's an example:
```
var funcs = [];
// let's create 3 functions
for (var i = 0; i < 3; i++) {
  // and store them in funcs
  funcs[i] = function() {
    // each should log its value.
    console.log("My value: " + i);
  };
}
for (var j = 0; j < 3; j++) {
  // and now let's run each one to see
  funcs[j]();
}
```

When you run this, you'll see "My value: 3" feach time! This is beacuse the anonymous functions inside the first loop are bound to the function-scoped var `i`. `i`, which is 3 once the first loop finishses. Before `let`, developers would use immediately invoked functions (see below) to solve this.

#### `var`, `let, and Hoisting
Variables declared with `var` keyword are hoisted (initialized with undefined before the code is run) which means they are accessible in their enclosing scope even before they are declared. `let` variables are not initialized until their definition is evaluated. Accessing them before the initialization results in a ReferenceError. 

*See snippets/functional_vs_block...*

## Global Variables
Doesn't relying on local scope make our code overly complex? Can't we just use Global Vars so whatever functions we invoke know about them?

No. We have limited memory, and we want to avoid *polluting the Global namepsace.*

It's easy to create collisions between all the JS scripts a web app may employ if everything is declared Globally.

### IIFE
Modern JavaScript employs Modules, and Module Bundlers. However, before those existed, developers used what we've learned so far to avoid issues with Global variables. They employed Immediately Onvoked Function Expressions (IIFE).
*Example*
`(function)() {

})();`

*Recall:*
The open praenthesis keeps this function from being hoisted - it is a *function expression*.

It is also an anonymous function (no name), and we Immeidately invoke it with the final `();`.

This allows providing all of a given library's code inside of a local scope, as the expression isn't assigned to a variable, so there is no Global property.

This is how older libraries like Jquery avoided polluting the global environment.

*See /snippets/iife.js & iife.html*

IIFE allows attaching private data to a function, creating a fresh lexical environment.

## `this`
*Recall:*
Keyword added to every execution context, including Global.

`this` is the object that the function is a property of
`obj.someFunction(this)`

`this` was created to give methods access to their objects. It also allows us to execute the same code for multiple objects.

It is easy to accidentally access Global Context/Evironment with `this`, so be careful.

`this` == who called me?

`this` is *NOT* Lexically Scoped! It is Dynamically Scoped - it matter how the function was called, not where it was written.

*See snippets/fun_with_this.js*

## Revisit: Lexical Scope vs. Dynamic Scope
### `call()`, `apply()`, and `bind()`
These are bandaids to deal with the dynamic scoping of `this`.
`call` and `apply` are useful for borrowing methods from other objects.

`bind` is useful for calling functions later.

*See snippets/more_fun_with_this.js*

### Function Currying with `bind`
Currying - partially giving a function a parameter.
**NOTE:** More depth on Currying in Functional section

*See: snippets/function_currying_bind.js*

*See: snippets/this_exercise\*.js*

## Termninology Context vs. Scope

*Aside: I thought this was clear but am leaving it in for completeness.*

*Scope* is the concept of the variable access of a function when it is invoked. What is in the variable and lexical environments, and scope chain?

*Context* is an actual JS structure determined by how a function is invoked.

### TODO: Compare `[[Scopes]]` and `[[Environment]]` properties

## Resources
Execution Context, Lexical Environment, and Scope
https://stackoverflow.com/questions/12599965/lexical-environment-and-function-scope

