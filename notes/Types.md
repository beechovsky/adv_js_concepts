# Notes from Javascript: The Advanced Concepts
 *https://www.udemy.com/course/advanced-javascript-concepts/*

## Types
There are only 7 types in native JS
- number
- boolean
- string
- undefined
- null
- symbol
    - new in ES6; used for unique object properties (explained more later)
- objects

All types are primitive and non-primitive.

### Primitive Types
Data that only represents a single value. A variable of a primitive type directly contains the value of that variable.

Non-primitive types don't directly store values. They have a reference.

### `typeof`
Javascript operator to find type of an item.

#### `typeof null`
Returns 'object'!
Actual mistake made by language creator. Too costly to fix, so this is how we do.

#### `undefined` or `null`
`undefined` is the absence of a definition. Default value when JS engine initializes variables, for instance.

`null` is the absence of a value.

#### `typeof function(){}`
Returns 'function'!
Technically, there is no function type. Arrays and functions are objects. More detail later.

#### Finding Array types
Use Array.isArray(), as typeof will simply return 'object'.

#### Standard built-in objects
"Everything is JavaScript is an object." - Not really.

Things we interact with in JS have object wrappers.

Ex.
`true.toString();` - returns `'true'`.
JS has silently wraped the primitive in the wrapper object.


### Pass by Reference vs. Pass by Value
Primitve types are immutable. In order to change them we need to remove the original primitive value. Reassigning a primitive updates the value stored at the address the variable knows. It doesn't create a new chunk of memory or point to another. This is pass by value.

Objects use Pass by Reference. Setting one object equal to another doesn't simply update the values of the target object, it makes both objects point to the same place in memory - both reference the same thing.

Why use Pass by Reference? Saving memory wherever possible. Objects can get huge. This can be dangerous, so you may want o copy objects in a manner allowing discrete updates. This is Cloning.

#### Cloning Objects to avoid overwrite
There are mulitple ways to clone objects, which creates copies that don;t also point to the same place in memory.

Using `Object.assign()`:
`let obj2 = Object.assign({}, obj1);`
We can also use the spread operator:
`let obj2 = {...obj1}`

With Arrays, you can use Array.concat
`let newArray = [].concat(oldArray)`

### What about cloning objects with nested objects?
The methods shown above will create a new object that exists somewhere else in memory, but the child object property is still a reference to the original, and both objects properties refer to the same object in one place in memory. This is *shallow* cloning.

For deep cloning, we can use the JSON object like so:
`let deepClone = JSON.parse(JSON.stringify(obj2))`

However, one should be wary of deep cloning, as it can be very costly on performance if an object is deep - containing many levels of nested object properties.

### Comparing Objects
Comparing objects can be difficult, unless they are fairly simple, 'JSON-like' objects. In that case, you can use the `JSON.stringify()` method above like so:
`var eq = JSON.stringify(user1) === JSON.stringify(user2);`

### Type Coercion
Type Coercion is the conversion of a variable of one type to another, usually to satisfy an expression.

**NOTE:** Type Coercion is pretty hairy in JS, and therefore we won't do a deep dive into it. Instead, we'll focus on recognizing it and undersanding a few cases where it happens, and why.

See:
https://dorey.github.io/JavaScript-Equality-Table/

Most/all languages have type coercion. Recall, in memory, all of this data looks much different and is always boiled down to binary.

Javascript coerces 1 into false in conditional statements, and 0 into false

`==` incurs type coercion
`===` explicit comparison, doesn't coerce type.

In general, `==` isn't as predicatble, something we endeavor to achieve in JS. So avoid it if possible.

`Object.is` -  works much like `===`, except for `-0` and `+0` and `NaN`.

### Static vs Dynamically Typed
**NOTE:** This section is pretty light and hand-wavy, which is fine.

There are two spectrums of typing:
- Dynamic and Static
- Strong and Weak
    - often misunderstood that static is always strong and dynamic is always weak; this is false
    -  consider Python vs. JavaScript
        - Python won;t coerce a statement like the following, despite being dynamically typed:
        - `num = 100; num + 'hola'`

Statically typed
- Pros
    - Staticically typed languages allow allocating the exact size of memory needed for your variable.
    - Additionally, compilation will catch type mismathces so there will be fewer bugs in the code typically.
    - Provides 'inline documentation'.
- Cons
    - more complex code
    - slower development due to considering type

Dynamically typed
- Pros
    - spend less time debugging syntax and semantic errors
    - more debugging time is spent on logic

In dynamically typed languages, type is checked at runtime or JIT compilation.

JavaScript is Dynamically and Weakly typed.
`var a = 100` -  what type is this? The interpreter figures out it's a `number`.

In a statically typed language, we'd see something like this:
`int a = 100` - we know its an `int`, so we know how much memory to allocate.

#### Enter Typescript
Goal: Introduce Static Type cheiking and reduce bugs

There are other Statically typed JS implemetnations (Flow, ReasonML, Elm, etc.).
Flow is a static type checker commonly used with React, and compiled via Babel. You'll see `// @flow` near the top of a file. Included in Create React App tooling.

Typescript differs from Flow in that it has its own compiler - it's a superset of JS. The TypeScript compiler outputs JS for the browser.

Reason is a totally different language with it's own compiler that outputs JS. Not a superset of JS.

Elm is like ReasonML - a totally different language with it's own compiler.

TypeSript is currently the dominant Statically typed language for JS. Originally due to Angular, but it is also used in React quite a bit.

#### When to use Static type checking
When the project is growing to the point where new hires are a must. Self documenting code is easier to learn.

### Arrays, Functions, and Objects