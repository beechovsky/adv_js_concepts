// try to guess the types
false == "" // guess true; empty string is falsy
false == [] // guess true; empty list is falsy, although objects may not behave like primitives
false == {} // guessing false, as I dont hink an object is valueless when empty like strings and arrays
"" == 0 // guess true; empty is falsy is nully is 0
"" == [] // guess true; empty list means no value, which means null/false/0
"" == {} // hmmm. I dont think an empty object is literally valueless like an array or string, so false
0 == [] // guess true; 0 and empty lsits.strings are falsy
0 == {} // false; empty object is valueless like arrays or strings. not falsy enough
0 == null // guess false, despite my feelings; in javascript, null means no value - 0 is a value

// 1. correct
// 2. correct
// 3. correct
// 4. correct
// 5. correct
// 6. correct
// 7. correct
// 8. correct
// 9. correct
