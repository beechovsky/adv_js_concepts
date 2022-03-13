// Ex. 1
(function() {
    var a = 1;
})();

// what happens when we access the variable a outside of that function definition?
// scoped to the function - it will be unavailable
a;

// Ex. 2
// The following is also valid
// Ex. 1
(function() {
    var a = 1;
}());

// what happens when we access the variable a outside of that function definition?
// scoped to the function - it will be unavailable
a;