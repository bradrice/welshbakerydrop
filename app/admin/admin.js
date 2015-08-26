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
    //$scope.data = $firebaseObject(ref.child('products').child('productName'));
// The obj variable will appear to be empty here and won't contain any remote data,
// because the request to the server has not returned when we reach this line.
    console.log($scope.data);

    $scope.products = $firebaseArray(ref);
    $scope.products.$add({"products":{
        "Id": "1002",
        "Name": "6 Packs",
        "Quantity": "6",
        "Price": "28.88",
        "ProductUrl": "http://www.welshbaker.com/boxdeals",
        "Extra": "0",
        "ExtraQuantity": "0",
        "YourOption": "textarea976",
        "CatalogId": "112"
    }});
}]);