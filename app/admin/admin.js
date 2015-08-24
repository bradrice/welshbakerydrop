'use strict';

var admin = angular.module('myApp.admin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        });
    }]);

admin.controller('AdminCtrl', ["$scope", "$firebaseArray", "$firebaseObject", function( $scope, $firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://welshbaker.firebaseio.com");
    $scope.data = $firebaseObject(ref);
// The obj variable will appear to be empty here and won't contain any remote data,
// because the request to the server has not returned when we reach this line.
    console.log($scope.data);
    console.log("I'm the admin");

}]);