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

app.factory('ItemsService', ['$firebaseArray', '$firebaseObject', 'FIREBASE_URI', function ($firebaseArray, $firebaseObject, FIREBASE_URI) {

    var items;

    var getItems = function (urlparams) {
        var ref = new Firebase(FIREBASE_URI);
        var rootRef = ref.child(urlparams);
        items = $firebaseArray(rootRef);
        return items;
        console.log(items);
    };

    var addItem = function (item) {
        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);
