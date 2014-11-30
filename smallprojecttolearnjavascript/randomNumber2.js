var getNumberss = function() {

  var randomArray5 = [];
  var randomArray6 = [];

  var x;
  var y;

  function compareMe(num1, num2) {
    return num1 - num2;
  }

  // create 5 random numbers raning from 1 to 59
  // Zero is not allow
  function getNum1() {
    x = Math.ceil(Math.random() * 59);
    return x;
  }

  // creat 6 random numbers ranging from 1 to 35
  function getNum2() {
    y = Math.ceil(Math.random() * 35);
    return y;
  }

  // the first 5 number cannot be repeated

  for (var i=1; i<=5; i++) {
    getNum1();

    if (randomArray5.indexOf(x) !== -1) // if number already exist in the array, call getNum1() again
      getNum1();

    randomArray5.push(x);
  }

  for (var i=1; i<=5; i++) {
    getNum2();

    if (randomArray6.indexOf(x) !== -1)
      getNum2();

    randomArray6.push(y);
  }



  // Sort numbers from randomArray5
  randomArray5.sort(compareMe);
  randomArray6.sort(compareMe);
  
  getNum2();
  randomArray6.push(y);

  console.log(randomArray5.toString());
  console.log(randomArray6.toString());




  // number should be displa in numerical order from lowest to highest
  // except the sixth number

};
