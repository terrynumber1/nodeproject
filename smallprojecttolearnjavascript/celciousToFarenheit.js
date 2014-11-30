function f2c(f) {
  console.log( (f-32)*5/9 );
}

function c2f(c) {
  console.log( c*9/5+32 );
}


function convert(num, degree) {
  if(degree === 'f')
    console.log( 'Farheit: ' + (num-32)*5/9 );
  else if(degree === 'c')
    console.log( 'Celcius: ' + num*9/5+32 );
  else {
    console.log('Conversion is not supported');
  }
}

var array1 = ['orange', 'banana', 'fruits'];

function printArray(arr) {
  for (var i=0; i<arr.length; i++) {
    console.log(arr[i]);
  }
}

// http://jsbeautifier.org/
