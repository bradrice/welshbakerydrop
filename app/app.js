'use strict';

// Declare app level module which depends on views, and lib
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.admin',
    'firebase',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.constant('FIREBASE_URI', 'https://welshbaker.firebaseio.com/');

app.factory('FlavorItemsService', ['$firebaseArray', '$firebaseObject', 'FIREBASE_URI', function ($firebaseArray, $firebaseObject, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI + 'Products/Flavor/FlavorName');
    var items = $firebaseArray(ref);

    var getItems = function (urlparams) {
        return items;
    };

    var addItem = function (item, urlparams) {

        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        console.log('removing ' + id)
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);

app.factory('ExtraItemsService', ['$firebaseArray', '$firebaseObject', 'FIREBASE_URI', function ($firebaseArray, $firebaseObject, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI + 'Products/ExtraChoice/ExtraChoiceName');
    var items = $firebaseArray(ref);

    var getItems = function (urlparams) {
        return items;
    };

    var addItem = function (item, urlparams) {

        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        console.log('removing ' + id)
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);

app.factory('ProductItemsService', ['$firebaseArray', '$firebaseObject', 'FIREBASE_URI', function ($firebaseArray, $firebaseObject, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI + 'Products/Product/ProductName');
    var items = $firebaseArray(ref);

    var getItems = function (urlparams) {
        return items;
    };

    var addItem = function (item, urlparams) {

        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        //console.log('removing ' + id)
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);

app.factory('SconeItemsService', ['$firebaseArray', '$firebaseObject', 'FIREBASE_URI', function ($firebaseArray, $firebaseObject, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI + 'Products/Flavor/scones_shortbread');
    var items = $firebaseArray(ref);

    var getItems = function (urlparams) {
        return items;
    };

    var addItem = function (item, urlparams) {

        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        console.log('removing ' + id)
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);
