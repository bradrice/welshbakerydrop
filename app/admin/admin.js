'use strict';

var admin = angular.module('myApp.admin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'admin/login.html',
                controller: 'LoginCtrl'
            });
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        });
    }]);

admin.controller('AdminCtrl', ["$scope", "$firebaseArray", "$firebaseObject", "$modal", "$log", function( $scope, $firebaseArray, $firebaseObject, $modal, $log) {
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
    $scope.showlogin = true;



    $scope.products = $firebaseArray(prodName);

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
        $scope.products.$add(prod).then(
            $scope.product = {}
        );
    };

    $scope.modaledit = function(item) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            item: item,
            resolve: {
                item: function(){
                    return item;
                }
            }
            });
        };

    $scope.toggleActive = true;

    $scope.setActive = function(id, item) {
        item.active = !item.active;
        $scope.products.$save(id).then(function(ref) {
            //ref.key() === item.$id; // true
        }, function(error) {
            console.log("Error:", error);
        });;

}

        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});

}]);

admin.controller('LoginCtrl', ['$scope', '$rootScope',  "$firebaseAuth", function($scope, $rootScope, $firebaseAuth) {
        var ref = new Firebase("https://welshbaker.firebaseio.com");

    $scope.signIn = function(){
        ref.authWithPassword({
            email    : $scope.email,
            password : $scope.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });
    }



}]);

angular.module('myApp.admin').directive('popoverEdit', function() {
    return function(scope, element, attrs) {
        console.log(this);
    };
});

angular.module('myApp.admin').controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {

    $scope.item = item;


    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});