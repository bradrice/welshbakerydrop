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
    $scope.addnew = false;



    var products = $firebaseArray(prodName);

    $scope.addProduct = function() {
        // $add on a synchronized array is like Array.push() except it saves to the database!
        var prod = {
            Id: $scope.product.id != undefined ? $scope.product.id : null,
            Name: $scope.product.name != undefined ? $scope.product.name : null,
            Quantity: $scope.product.quantity != undefined ? $scope.product.quantity : null,
            Price: $scope.product.price != undefined ? $scope.product.price : null,
            ProductUrl: $scope.product.url != undefined ? $scope.product.url : null,
            Extra: $scope.product.extra != undefined ? $scope.product.extra : null,
            ExtraQuantity: $scope.product.extraQuantity != undefined ? $scope.product.extraQuantity : null,
            CatalogId: $scope.product.catalogId != undefined ? $scope.product.catalogId : null,
        };
        console.log(prod);
        products.$add(prod).then(
            $scope.product = {}
        );
    };

}]);