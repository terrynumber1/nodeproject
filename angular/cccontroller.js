// Assign caseConversionApp module to variable x
var x = angular.module('caseConversionApp', []);

// Assign ccController to variable x
x.controller('ccController', function($scope, $filter) {

  // ng-model
  $scope.upperInput = "";
  $scope.lowerInput = "";

  $scope.lowerCased = function() {
    return $filter('lowercase')($scope.upperInput);
  }

  $scope.upperCased = function() {
    return $filter('uppercase')($scope.lowerInput);
  }

});
