var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider) {

    console.log("Hi");

    $routeProvider

    // route for the welcome page
    .when('/', {
        templateUrl: 'main.html',
        controller: 'TopgitController'
    })

    // route for the Text page
    .when('/text', {
        templateUrl: 'text.html',
        controller: 'TextController'
    });

    // // route for the contact page
    // .when('/corpus', {
    //     templateUrl : 'pages/corpus.html',
    //     controller  : 'corpusController'
    // });
});

app.controller("TopgitController",['$scope', function($scope) {

}]);

app.controller("TextController",['$scope', function($scope) {

}]);
