# Notes from Javascript: The Advanced Concepts
 *https://www.udemy.com/course/advanced-javascript-concepts/*

## Foundations, Part 2
# How JavaScript Executes
The JavaScript engine creates an ***execution context*** upon each function call.
Each function in the calls stack has its own execution context.

### Global Execution Context (GEC)
Base Context (on page load, for instance)
First item on stack
Provides `Global` object (often `Window`) and associated `this` keyword.

`this === window`

### Phases
*Creation Phase*
- Creation of GEC
*Execution Phase*
- Runs code

### Lexical Environment
Exists per execution context

### Hoisting
The part of Creation Phase where the JavaScript engine's allocation of memory for the variables and functions it sees in creation phase before execution.
- AKA Moving vars/funcs to top of respective envs during compilation
Engine cued by `var`, `function` keywords.

*See snippets/hoisting* snippets*

### Variable and Function Hoisting
Variables are not fully hoisted - only the variable name is stored.

`const` and `let` are not hoisted.

Declared Functions are fully hoisted, function *expressions* are not.

### Function Expressions and Hoisting
*Example function expression:*
`var someFunction = function() {
    // do something
}`

Only run after it's defined at runtime - stored the same as a variable defined with `var`. See more below.

Understanding hoisting provides a way to optimize memory use.

Hoisting means it's easy to accidentaly refer to things before they're properly defined.

**Recommendation:** Avoid hoisting
How?
- Avoid `var` unless absolutely necessary (actually need a global variable); use `let` and `const` instead
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
But, we may need access to/ iterate oever function arguments.
So, use `Array.from(arguments)` instead. This allows use of Array methods on arguments.

**Default Parameters** (ES6) - allows use of spread operator:
`function(...args) {
    // blah
}`

*Aside:*
(...args) seems insecure as you can send anything to a function with that signature, no?

*NOTE:*
Why, exactly, argumnets is inefficient to work with, other than not having array methods, isn't explained. **TODO: LOOK UP**

### Variable Environment
What about variables created in a function?
Each function's execution context has its own variable environment in addition to `this` and `arguments`. These are variables accessible only to the function they're defined in - they belong to the Lexical Environment of that function call's Execution Context.

*See snippets/variable_env.js*

### Scope Chain
Each execution context has a link back to its parent execution context - the Scope Chain.
This outer environment depends on where the function sits lexically.
If a variable accessed in a function isn't found within that function's execution context's variable environment, it goes up the scope chain looking for it.

Lexical Scope = Static scope (as opposed to Dynamic scope)
Lexical Scope = available data + variables where function is *defined*, not where it's *invoked*
Lexical Scope detemrines what variables are available, not where the function is called (dynamic scope).

### Function Lexical Environment
A variable of function declared inside of a function belongs to that functions's Lexical Environment.

*See snippets/lexical_scope.js*

*Recall:*
`eval()` and `with` are dangerous because you can alter scope and scope chains

### `[[scope]]`
Lexical environment === `[[scope]]` in the JavaScript specification.
Property of every function - visible in Chrome console.

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