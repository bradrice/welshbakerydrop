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

view1.controller('View1Ctrl', function($scope, $http, $filter) {


    $scope.models = {
        selected: null,
        lists: {"A": [], "B": [], "C": [], "prodList": [], "extraProds": [], 'hashmap': {}, 'selectQty': []}
    };

    $scope.my = {'num': 0, 'num2': 0, 'totalval': 0, 'totalAllowed': 0, 'currentTotal': 0, 'totalLeft': 0, 'extraAllowed': 0, 'flavorAllowed': 0, 'extraval': 0, 'flavorval': 0};
    $scope.boxfull = false;
    $scope.showExtras = false;
    $scope.model = {};
    $scope.model.qty = 1;


    $http.get('data/product.json').success(function (data) {
        $scope.models.lists.A = data.Products.Flavor.FlavorName;
        $scope.models.lists.C = data.Products.ExtraChoice.ExtraChoiceName;
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




    $scope.setFlavorAllowed = function(){
        console.log($scope.my.num);
        $scope.my.flavorAllowed = $scope.my.num;
        $scope.setboxfull();
    }

    $scope.setExtraAllowed = function(packQty, extQty){
        console.log(packQty + " : " + extQty);
        $scope.my.extraAllowed = parseInt(extQty);
        $scope.my.flavorAllowed = parseInt(packQty);
        $scope.showExtras = true;
        $scope.setboxfull();
    }


    $scope.setboxfull = function(){
        //$scope.my.totalval = $scope.my.num + $scope.my.num2;
        $scope.my.totalval = 0;
        $scope.flavorPacks =  $filter('filter')($scope.models.lists.B, {'category': 'flavorPack'});
        $scope.extraPacks =  $filter('filter')($scope.models.lists.B, {'category': 'Extra'});
        //console.log($scope.flavorPacks);
        //for(var i=0; i < $scope.models.lists.B.length; i++){
        //    $scope.my.totalval = parseInt($scope.my.totalval) + parseInt($scope.models.lists.B[i]['quantity']);
        //}
        $scope.my.totalLeft = parseInt($scope.my.totalAllowed) - parseInt($scope.my.totalval);

        if($scope.flavorPacks != undefined && $scope.flavorPacks.length > 0){
            var tempval = 0;
            for(var i=0; i < $scope.flavorPacks.length; i++) {
                tempval += parseInt($scope.flavorPacks[i]['quantity']);
            }
            $scope.my.flavorval = tempval;
        }
        if($scope.extraPacks != undefined && $scope.extraPacks.length > 0){
            var tempval = 0;
            for(var i=0; i < $scope.extraPacks.length; i++) {
                tempval += parseInt($scope.extraPacks[i]['quantity']);
            }
            $scope.my.extraval = tempval;
        }
        console.log("Extra Allowed: " + $scope.my.extraAllowed + " Extra:  " + $scope.my.extraval + " Flavor allowed " + $scope.my.flavorAllowed + " Flavor: " + $scope.my.flavorval);
        console.log($scope.my.flavorval < $scope.my.flavorAllowed );
        if ($scope.my.extraval < $scope.my.extraAllowed && $scope.my.flavorval < $scope.my.flavorAllowed) {
            console.log('box not full');
            return $scope.boxfull = false;
        }
        else {
            return $scope.boxfull = true;
            $('#fullModal').modal();
        }

        //console.log($scope.boxfull);
    }

    $scope.setQty = function(e, val){
        console.log(val);
        e.preventDefault();
        $scope.model.qty = val;
    }

    $scope.removeItem = function(index, item){
        console.log(item);
        if (index > -1) {
            $scope.models.lists.B.splice(index, 1);
            delete $scope.models.lists.hashmap[item.id];
            $scope.setboxfull();
        }
    }

    $scope.decrementItem = function(index, item){
        console.log(item);
        if (index > -1) {
            $scope.models.lists.hashmap[item.id]['quantity'] = parseInt($scope.models.lists.hashmap[item.id]['quantity']) - 1;
            $scope.setboxfull();
        }
    }

    $scope.addItem = function(index, item, model){
        console.log("flavor Allowed: " + $scope.my.flavorAllowed + " flavor: " + $scope.my.flavorval);

        //console.log($scope.models.lists.hashmap);
        if($scope.my.flavorAllowed > $scope.my.flavorval){
            if(item.Id in $scope.models.lists.hashmap){
                console.log('true - ' + item.Id + ' item already exists');
                $scope.models.lists.hashmap[item.Id]['quantity'] = $scope.models.lists.hashmap[item.Id]['quantity'] + parseInt(model.qty);
            }
            else {
                console.log('false - need to create item in hashmap');
                $scope.models.lists.hashmap[item.Id] = {};
                $scope.models.lists.hashmap[item.Id]['name'] = item.Name;
                $scope.models.lists.hashmap[item.Id]['quantity'] = parseInt(model.qty);
                $scope.models.lists.hashmap[item.Id]['id'] = + item.Id;
                $scope.models.lists.hashmap[item.Id]['category'] = 'flavorPack';
                var bitem = $scope.models.lists.hashmap[item.Id];
                console.log(bitem);
                $scope.models.lists.B.push(bitem);
            }

            $scope.setboxfull();
        }
        else {
                $('#fullModal').modal();
            }

    }

    $scope.addExtItem = function(index, item, model){
        console.log("extra Allowed: " + $scope.my.extraAllowed + " extra: " + $scope.my.extraval);

        //console.log($scope.models.lists.hashmap);
        if($scope.my.extraAllowed > $scope.my.extraval){
            if(item.Id in $scope.models.lists.hashmap){
                console.log('true - ' + item.Id + ' item already exists');
                $scope.models.lists.hashmap[item.Id]['quantity'] = $scope.models.lists.hashmap[item.Id]['quantity'] + parseInt(model.qty);
            }
            else {
                console.log('false - need to create item in hashmap');
                $scope.models.lists.hashmap[item.Id] = {};
                $scope.models.lists.hashmap[item.Id]['name'] = item.Name;
                $scope.models.lists.hashmap[item.Id]['quantity'] = parseInt(model.qty);
                $scope.models.lists.hashmap[item.Id]['id'] = item.Id;
                $scope.models.lists.hashmap[item.Id]['category'] = 'Extra';
                var bitem = $scope.models.lists.hashmap[item.Id];
                console.log(bitem);
                $scope.models.lists.B.push(bitem);
            }

            $scope.setboxfull();
        }
        else {
            $('#fullModal').modal();
        }

    }

    $scope.emptyBox = function(){
        $scope.models.lists.B = [];
        $scope.models.lists.hashmap = {};
        $scope.setboxfull();
    }


    $scope.prod = {'price': 0};
    $scope.showprice = false;
    $scope.setPrice = function(price){
        console.log(price);
        $scope.showprice = true;
        $scope.prod.price = price;
    }



      // Generate initial selectQty model
      for (var i = 1; i <= 36; ++i) {
          //console.log($scope.flavors);
        $scope.models.lists.selectQty.push(i);
        //$scope.models.lists.B.push({label: "Item B" + i});
      }


      // Model to JSON for demo purpose
      $scope.$watch('models.lists.B', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
      }, true);

        //console.log($scope.models.prodList.Quantity);

});


