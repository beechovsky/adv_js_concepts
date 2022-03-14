1 == '1' // true
1 === '1' // false - no type coercion

if(1) {
    console.log('yup')
} // return yup as 1 is coerced to true

if(0) {
    console.log('nope')
} // no log, as 0 is coerced to false

// Object.is
// Consider negative an positive zero:
-0 === +0 // true, though technically different

Object.is(-0,+0) // false

NaN === NaN // false
Object.is(NaN, NaN) // true