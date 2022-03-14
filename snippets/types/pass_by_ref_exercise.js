// from: https://replit.com/@aneagoie/reference-exe
const number = 100
const string = "Jay"
let obj1 = {
  value: "a"
}
let obj2 = {
  value: "b"
}
let obj3 = ob2; // pass by reference

function change(number, string, obj1, obj2) {
    // operating on its own params! - these are not global vars
    // TODO: declare globals with 'var' instead to see behavior
    number = number * 10;
    string = "Pete";
    obj1 = obj2;
    obj2.value = "c";
}

change(number, string, obj1, obj2);

//Guess the outputs here before you run the code:
console.log(number); // 10
console.log(string); // Jay
console.log(obj1.value); // a

// Why?
// In general, it's a bit of a gotcha because they named the parameters for the function the same as the global variables.
// Because the parameters in the function have exactly the same names as the global variables, the parameters get used within the function.
// Try renaming the global variables.

// That said, numbers and strings are not passed by reference, they get passed by value.
// So, the internal variables number and string are never the same as those in your global scope.

// The object property value of obj1 also doesn't get changed because as soon as we overwrite the reference in the change function (line 17),
// the reference to obj1 gets dropped and we assign the new value to a new object which only exists in the function.