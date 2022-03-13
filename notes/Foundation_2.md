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
What about variables created in a function?
Each function's execution context has its own variable environment in addition to `this` and `arguments`. These are variables accessible only to the function they're defined in - they belong to the Lexical Environment of that function call's Execution Context.

*See snippets/variable_env.js*

### Scope Chain
Each execution context has a link back to its parent execution context. Each lexical environment also holds a reference to a parent lexical environment. These links comprise the Scope Chain.
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
**Summary**
When a function is invoked, including the creation of the Global object, an Execution Context is created and added to the Stack. Execution Contexts, which track execution, have corresponding Lexical Environments, which contain mappings of variables and functions defined within that context as well as a reference to their parent lexical environments. Those links constitute the Scope Chain.
*Execution Contexts and Lexical Environments are actual JavaScript constructs.*
*Scope is a concept referring to the visibility of variables and functions to executing code.* A variable or function is 'in scope' if it is within the current lexical environment OR in the lexical environment chain (Scope Chain) of the enclosing function.

### TODO: Compare `[[Scopes]]` and `[[Environment]]` properties

### Leakage of Global Variables
Referencing previously undefined variables in JS may not break ...
JS looks at the variable, recognizes it hasn't seen var, let,const, etc.
So, it then goes up scope chain to Global environment and looks for the variable.
Global Env sees it doesn't exist, and will create it for you.

Enter `'use_strict'`
- prevents JS from doing unpredicatble things on edge cases

*See snippets/lexical_scope_leakage.js and snippets/lexical_scope_function_expression.js*

### Function Scope vs. Block Scope
With functionScope,

Dopesnt mean you can never use `var`, but in most cases you can probably use let, const

*See snippets/functional_vs_block...*

## Global Variables
Doesn't relying on local scope make our code overly complex?
can't we just use Global Vars so whatever functions we invoke know about them?

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

*See snippets/fun_with_this.js*

### Revisit: Lexical Scope vs. Dynamic Scope

### TODO: Compare `[[Scopes]]` and `[[Environment]]` properties

## Resources
Execution Context, Lexical Environment, and Scope
https://stackoverflow.com/questions/12599965/lexical-environment-and-function-scope

