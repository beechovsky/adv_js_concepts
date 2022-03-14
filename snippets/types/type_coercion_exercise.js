// try to guess the types
false == "" // guess true; empty string is falsy
false == [] // guess true; empty list is falsy, although objects may not behave like primitives
false == {} // guessing false, as I don't think an object is valueless when empty like strings and arrays
"" == 0 // guess true; empty is falsy is nully is 0
"" == [] // guess true; empty list means no value, which means null/false/0
"" == {} // guess false; I don't think an empty object is literally valueless like an array or string
0 == [] // guess true; 0 and empty lists/strings are falsy
0 == {} // guess false; empty object is not valueless like arrays or strings; not falsy enough
0 == null // guess false; in Javascript, null means no value - 0 is a value

// 1. correct
// 2. correct
// 3. correct
// 4. correct
// 5. correct
// 6. correct
// 7. correct
// 8. correct
// 9. correct
