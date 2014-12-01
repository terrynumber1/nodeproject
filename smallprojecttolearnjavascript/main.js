var paragraph = "The quick brown fox jumped over the lazy dog.";
tempArray = paragraph.split(" ");
oldWord = "brown";
newWord = "red";

for (var i=0; i<tempArray.length; i++) {
  if (tempArray[i] === oldWord)
    tempArray[i] = newWord;
}

tempArray = tempArray.join(" ");

console.log(tempArray);

function findReplace(oldWord, newWord) {
  var paragraph = "The quick brown fox jumped over the lazy dog.";
  tempArray = paragraph.split(" ");

  for (var i=0; i<tempArray.length; i++) {
    if (tempArray[i] === oldWord)
      tempArray[i] = newWord;
  }

  tempArray = tempArray.join(" ");
}


var getNumbers = function() {

  var randomDraw = [];
  var x;
  var y;

  // function helper for array numerical sorting
  function compareMe(num1, num2) {
    return num1 - num2;
  }

  var getX = function() {
    x = Math.ceil(Math.random() * 75);
    return x;
  };

  var getY = function() {
    y = Math.ceil(Math.random() * 15);
    return y;
  };

  // generate 5 randoms number and push it into randomDraw array
  for (var i=1; i<=5; i++) {
    getX();
    if (randomDraw.indexOf(x) !== -1) { // if the number exist in the array
      getX(); // call getX() again
    }

    randomDraw.push(x);
  }

  // Sort 5 numbers from array:
  randomDraw.sort(compareMe);

  getY();
  randomDraw.push(y);

  console.log( randomDraw.toString() ); // converting randomDraw array to string and display it

};

var car = {
  "make": "Subara",
  "model": "Outback",
  "color": "blue",
  "year": "2014",
  "mileage": "67,000",
  "rating": "9",
  "printRating": function() { console.log("The car rates " + car.rating + "out of 10."); }
};

for (var k in car) {
  console.log(k);
}

var longVersion = {
  "english": "The quick brown fox jumped over the lazy dog",
  "portuguese": "A ligeira raposa marrom saltou sobre o cão preguiçoso",
  "spanish": "El rápido zorro marrón saltó sobre el perro perezoso",
  "french": "Le renard brun rapide saute par dessus le chien paresseux",
  "printObject": function() {
    for (var kk in longVersion) {
      if (typeof longVersion[kk] === "string")
        console.log( kk + ": " + longVersion[kk] );
    }
   }
};

var x = function (input1, input2) {
  return input1 + input2;
}

// The object arguments

var x = function() {
  return arguments[0] + arguments[1].toUpperCase();
};

// "this" place holder

var x = 33;
var myObject = {
  x: 7,
  test: function() {
    var x = 5;
    return this.x; // return 7
  }
};

var f = 33;
var myCastle = function() {
  var f = "DDDD";
  return f;
};
