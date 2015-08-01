'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute', 'xml'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

view1.config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
});

view1.controller('View1Ctrl', function($scope, $http) {


    $scope.models = {
        selected: null,
        lists: {"A": [], "B": [], "prodList": [], "extraProds": []}
    };


    $http.get('data/product.json').success(function (data) {
        $scope.models.lists.A = data.Products.Flavor.FlavorName;
        var prods = data.Products.Product.ProductName;
        for (var i = 0; i < prods.length; i++) {
            //console.log(prods[i]);
            if(prods[i].ExtraQuantity > 0){
                $scope.models.lists.extraProds.push(prods[i]);
            }
            else {
                $scope.models.lists.prodList.push(prods[i]);
            }
        }

        //console.log($scope.flavors[0].Name)
    });


    $scope.my = {'num': 0};
    $scope.boxfull = false;


    $scope.setboxfull = function(){
        console.log($scope.models.lists.B.length)
        if ($scope.models.lists.B.length < $scope.my.num) {
            $scope.boxfull = false;
        }
        else {
            $scope.boxfull = true;
            alert('You have filled the box. Either select a larger box, or remove an element.');
        }
        console.log($scope.boxfull);
    }

    $scope.removeItem = function(index, item){
        if (index > -1) {
            $scope.models.lists.B.splice(index, 1);
        }
    }

    $scope.dropCallback = function(event, index, item){
        console.log(item);
    }


      //// Generate initial model
    //  for (var i = 0; i <= 3; ++i) {
    //      //console.log($scope.flavors);
    //    $scope.models.lists.A.push({label: "Item A" + i});
    //    //$scope.models.lists.B.push({label: "Item B" + i});
    //  }
    //$scope.models.lists.B = [];

      // Model to JSON for demo purpose
      $scope.$watch('models.lists.B', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
      }, true);

        //console.log($scope.models.prodList.Quantity);


});