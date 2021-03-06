# Introductory Notes from Javascript: The Advanced Concepts
 *https://www.udemy.com/course/advanced-javascript-concepts/*

## Foundations, Part 1
**NOTE: Much of this is obvious, retread, refresher, etc. However, it's easy to miss the forest for the trees, so there is utility here.**

### General
JavaScript is a language conforming to the ECMAScript Standard.

### ECMAScript Engine
Lex. Analysis (Parsing) ->
- AST
- Interpreter ->
    - Byte Code
    - Profiler ->
          - Compiler ->
             - Optmized Code

### Interpreters & Compilers
*Interpreters:*
- Read and translate line by line on the fly (runtime, JIT)

*Compilers:*
- Works ahead of time to create a translation of code into a lower-level language the computer understands, which is used at runtime.
- Babel: JS Compiler that produces browser-compatible JS from modern JS
- TyprScript: superset of JS that compiles to JS

Most languages and programs are both interpreted and compiled. Even x86 machine code is compiled down further.

### When to Compile vs. When to Interpret
*Interpreters* have faster start-up time - no stoppage for compilation - as they process in the moment.
Good choice for JS, as the JS is sent by a user and needs to be dealt with immediately.
However, interpreters can be very slow due to repreating translations for the same operation.

*Compilers* are slower to start, as they have a compilation step, but once compiled, we're dealing with lower-level code which is processed more rapidly as it's directly understood by the CPU.

You can combine the two to get the pros of each and mitigate the cons.

### JIT Compilers
**LOOKUP**
V8, for instance, interprets ASTs into Bytecode, but also monitors/profiles the interpreter to deduce possible optimizations. If something is repeated, for instance, that code will be passed off to a JIT compiler. This optimized code will be spliced into the Bytecode.

Knowing this means we can avoid writing code that confuses the compiler, leading to deoptimization, and instead write code that helps the profiler and compiler create the most optimal output.

### Things to avoid to help the JS engine:
  - functions that call eval()
  - `arguments` keyword
  - `for ... in` loops
  - `with`
  - delete

#### Why these are bad:
  - Inline Caching
  - Hidden Classes
  - and more - covered later

#### Inline Caching
**NOTE: LOOK THIS UP; example is jank.**

#### Hidden Classes
The compiler utilizes *hidden classes* under the hood to represent object instances.
This can be deoptmized easily. For instance, defining object properties of the same class in different orders leads to creation of extra, unnecessary hidden classes, as a new hidden class will be created for each instantiation of the same class if the properties are assigned in a different order.

Write 'predictable' code.
- Covered a little. Use of `'use strict'` for instance.
***NOTE: LOOK THIS UP.***

### Web Assembly
Standard Binary Executable Format - a machine code for the web. Previously, browsers didn't agree on formats entirely.

## Call Stack and Memory Heap
*The Heap* is a region of memory where the engine stores *data* being processed.
- Variable assignment, for example
*The Stack* is a region of memory allocated to store *function calls* to allow programs to know where point of execution is. FILO queue.
- Stack Frame - state of the stack.

### What about heap overuse?
JavaScript uses Garbage Collection
- Mark and Sweep Algorithm
Filling heap too quickly will overflow the heap/leak memory (infinite loops, for example).
Causes of leaks:
- Global Variables - another reason why scoping appropriately is important
- Event Listeners
  - element.addEventListener('click', onClick);**NOTE: look up why**
- setInterval()
  - Unless cleared, objects ref'd here will never be cleaned up.

## JavaScript is Single-Threaded
Only one set of instructions is executed at a time on one call stack.
Initially helped simplify implementation; more than a single thread wasn't required.
Therefore, JS is synchronous. Long running tasks are slow.
*Example:* alert();
- nothing happens until you click it away.

So, we don't always just use the Javascript engine to run code, we also use the Runtime.

### JavaScript Runtime
- Engine + Web API + Event Loop + Callback Queue

### Web API
- Specific to Browser/Runtime
- Not native JS
- Typically revolves around Window object
- Each browser has a JS engine (like V8) and a Runtime that provides a Web API
- Web API send http requests, listen to DOM events, delay execution, caching, etc.
- Browsers use lower level langs in the background to perform these operations
- Web APIs are asynchronous
- If something hits the Call Stack that isn't recognized by the engine, it gets sent to Web API.

**NOTE:** The course indicates this is a neat way to write asynchronous code, but there are actual async methods now, so this seems unnecessary.

*See JS Runtime Playground:*
http://latentflip.com/loupe/

*See snippets/web_api.js & snippets/fix_overflow.js*

### Event Loop
Monitors Call Stack and returns data and/or callbacks from Callback Queue, which is populated when the Web API finishes working, back into the Call Stack.
- More detail later in Asynchronous notes

### Node - server side runtime & API
- Server-side runtime based on asynchronous I/O that is non-blocking

## Resources
### JS Cheatsheet
https://zerotomastery.io/cheatsheets/javascript-cheatsheet-the-advanced-concepts/?utm_source=udemy&utm_medium=coursecontent
