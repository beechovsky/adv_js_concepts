// from: https://replit.com/@aneagoie/reference-exe
const num = 100
const str = "Jay"
let ob1 = {
  value: "a"
}
let ob2 = {
  value: "b"
}
let ob3 = ob2; // pass by reference

function change(number, string, obj1, obj2) {
    // operating on its own params!
    number = number * 10;
    string = "Pete";
    obj1 = obj2;
    obj2.value = "c";
}

change(num, str, ob1, ob2);

//Guess the outputs here before you run the code:
console.log(num); // 10
console.log(str); // Jay
console.log(ob1.value); // a

// Why?
// In general, it's a bit of a gotcha because they named the parameters for the function the same as the global variables.
// Try renaming the global variables to see what is happening.

// Because the parameters in the change function have exactly the same names as the global variables, the parameters get used within the function.
// The function will use those parameters as intenal variable and not use the global variables we defined.

// That said, numbers and strings are not passed by reference, they get passed by value.
// So, the variable number and the variable string are never the same as those in your global scope.

// The object property value of obj1 also doesn't get changed because as soon as we overwrite the reference in the change function (line 15),
// the reference to obj1 gets dropped and we assign the new value to a new object which only exists in the function.