var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

app.controller("MainController")

app.config(function($routeProvider) {
    $routeProvider

    // route for the welcome page
        .when('/', {
        templateUrl: '#welcome',
        controller: 'WelcomeController'
    })

    // route for the Text page
    .when('/text', {
        templateUrl: '#getout',
        controller: 'TextController'
    })

    // // route for the contact page
    // .when('/corpus', {
    //     templateUrl : 'pages/corpus.html',
    //     controller  : 'corpusController'
    // });
});

app.controller("WelcomeController", function($scope) {

});

app.controller("TextController", function($scope) {

});
