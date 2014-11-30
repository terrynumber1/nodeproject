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
