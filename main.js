var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'angular-loading-bar', 'ngAnimate', 'rzModule']);

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
});

app.controller("TopgitController", ['$scope', 'Github', function($scope, github) {

    $scope.query = "";

    $scope.repos = {

    };

    $scope.alerts = [];

    $scope.minStar = 0;

    $scope.starSliderOptions = {
        value: 1000,
        options: {
            floor: 0,
            ceil: 100
        }
    }

    $scope.rate = {
        limit: 0,
        remaining: 0
    };

    $scope.search = function() {
        console.log("Search called");
        github.searchRepoByLang($scope.query, $scope.minStar, function(data, status, headers) {
            $scope.repos = data.items;
            $scope.alerts = [];
            $scope.alerts.push({
                msg: "There are " + data.total_count + " repositories with " + $scope.query + " code with more than " + $scope.minStar + " stars...",
                type: "success"
            });
            $scope.rate.limit = headers('X-RateLimit-Limit');
            $scope.rate.remaining = headers('X-RateLimit-Remaining');
            console.log($scope.rate);
        }, function() {
            $scope.alerts = [];
            $scope.alerts.push({
                msg: "We are unable to fetch the data...! :(",
                type: "danger"
            });
        })
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
        searchRepos: function(query, callback, error) {
            $http.get(baseurl + "search/repositories?q=" + query).success(function(data, status, headers, config) {
                console.log(headers('X-RateLimit-Limit'));
                callback(data, status, headers, config);
            }).error(error);
        },

        searchRepoByLang: function(lang, min_star, callback, error) {
            this.searchRepos("stars:>=" + min_star + " language:" + lang, callback, error)
        }
    };

}]);

app.directive("repository", function() {

    return {
        templateUrl: 'repository.html',
        scope: {
            details: '='
        }
    };
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
