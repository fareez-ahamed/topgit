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

app.controller("TopgitController", ['$scope', 'Github', function($scope, github) {

    $scope.query = "";

    $scope.repos = {

    };

    $scope.search = function () {
        console.log($scope.query);
    };

    // github.getRepositories(function () {
    //     console.log("Controller done");
    // });
}]);

app.controller("TextController", ['$scope', function($scope) {

}]);

app.service("Github", ['$http', function($http) {

    var baseurl = "https://api.github.com/";

    return {
        getRepositories: function(query, callback) {
            $http.get(baseurl + "search/repositories?q="+query).success(function(data) {
                console.log(data);
                callback(data);
            });
        }
    };

}]);
