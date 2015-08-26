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
    //$scope.data = $firebaseObject(ref);
    var prodName = ref.child('Products/Product/ProductName');
    $scope.data = $firebaseObject(prodName);
    //$scope.data = $firebaseObject(ref.child('products').child('productName'));
// The obj variable will appear to be empty here and won't contain any remote data,
// because the request to the server has not returned when we reach this line.
    console.log($firebaseObject(prodName));
    $scope.product = {};

    var products = $firebaseArray(prodName);

    $scope.addProduct = function() {
        // $add on a synchronized array is like Array.push() except it saves to the database!
        products.$add({
            Id: $scope.product.id,
            Name: $scope.product.name,
            Quantity: $scope.product.quantity,
            Price: $scope.product.price,
            ProductUrl: $scope.product.url,
            Extra: $scope.product.extra,
            ExtraQuantity: $scope.product.extraQuantity,
            CatalogId: $scope.product.catalogId
        });
    };

}]);