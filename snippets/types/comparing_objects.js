// How would we compare two objects if they are pointing to a different location in memory but have the same properties?
var user1 = {name: 'nerd', org: 'dev'};
var user2 = {name: 'nerd', org: 'dev'};

var eq = user1 == user2;
//alert(eq); // returns false

// There are many possible solutions,
// but for simple objects this is fast and simple:
eq = JSON.stringify(user1) === JSON.stringify(user2);
alert(eq);