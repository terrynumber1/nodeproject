var x = angular.module("myAppModule", []);
x.controller("myController", function($scope) {

  function f2c(fa) {
    var result1 = (fa-32) * 5 / 9;
    return result1;
  }

  // $scope.fahrenheit = 100;
  // var fahrenheit = 111;
  $scope.result = f2c(80);

});
