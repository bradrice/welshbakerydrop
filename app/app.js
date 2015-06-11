'use strict';

// Declare app level module which depends on views, and lib
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'dndLists'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
