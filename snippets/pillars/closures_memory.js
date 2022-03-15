// closures have two very inportant main benefits

// memory efficient
// encapsulation


// How are they memory efficient?
// Consider a heavyweight function that creates a large amount of data:
function heavyDuty() {
    const bigArray = new Array(5000).fill(':)');
    return bigArray
}

heavyDuty() // returns list

// let's assume the above is a serious operation
function hd2(index) {
    const bigArray = new Array(5000).fill(':)');
    console.log('created!')
    return bigArray[index]
}

hd2(234)

// Every time we run the function, we create a huge array that is then destoyred.
// This is not efficient.

// How do we create the array and, since we know it's used a bunch, keep it in memory?
// We want to return a function that holds a ref to bigArray.
function heavyDutyBetter() {
    console.log('created again!')
    // so, we now have a function call with a ref to bigArray in a closure!
    return function(index) {
        return bigArray[index]
    }
}

// Let's try it
// First call og heavy duty a few times:
hd2(234)
hd2(234)
hd2(234)


// Now, let's create a variable that will use the better function
// Note we don't ened to pass the index here; it now belongs to nested function, which is returned when we call the variable!
const getHeavyDutyBetter = heavyDutyBetter();
getHeavyDutyBetter(345)
getHeavyDutyBetter(456)
getHeavyDutyBetter(567)
// Only created the gue array once!