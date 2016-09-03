var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'angular-loading-bar', 'ngAnimate', 'rzModule', 'ui.knob']);

app.config(function($routeProvider) {

    console.log("Hi");

    $routeProvider

    // route for search page
        .when('/', {
        templateUrl: 'main.html',
        controller: 'TopgitController'
    })

    // route for my stats
    .when('/mystats', {
        templateUrl: 'mystats.html',
        controller: 'MyStatsController'
    });
});

app.controller("TopgitController", ['$scope', 'Github', '$http', function($scope, github, $http) {

    $scope.query = "";

    $scope.repos = [];

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

    $scope.rateKnobValue = 0;
    $scope.rateKnob = {
        scale: {
            enabled: true,
            type: 'lines',
            color: 'gray',
            width: 1,
            quantity: 20,
            height: 8
        },
        max: 10,
        readOnly: true,
        trackWidth: 30,
        barWidth: 30,
        trackColor: 'rgba(52,152,219,.1)',
        barColor: 'rgba(52,152,219,.5)'
    };

    $scope.languages = [];

    $scope.currentPage = 1;
    $scope.totalItems = 0;

    $scope.search = function() {
        console.log("Search called");
        github.searchRepoByLang($scope.query, $scope.minStar, $scope.currentPage, $scope.searchSuccess, $scope.searchFailure)
    };

    $scope.searchSuccess = function(data, status, headers) {
        $scope.repos = data.items;
        $scope.alerts = [];
        $scope.alerts.push({
            msg: "There are " + data.total_count + " repositories with " + $scope.query + " code with more than " + $scope.minStar + " stars...",
            type: "success"
        });
        $scope.rate.limit = $scope.rateKnob.max = headers('X-RateLimit-Limit');
        $scope.rate.remaining = headers('X-RateLimit-Remaining');
        $scope.rateKnobValue = $scope.rate.limit - $scope.rate.remaining;
        $scope.totalItems = data.total_count;
    };

    $scope.searchFailure = function() {
        $scope.alerts = [];
        $scope.alerts.push({
            msg: "We are unable to fetch the data...! :(",
            type: "danger"
        });
    };

    $scope.$watch('currentPage', function(newVal, oldVal) {

        if(newVal != oldVal) {
            console.log("Current Page"+newVal);
            github.searchRepoByLang($scope.query, $scope.minStar, $scope.currentPage, $scope.searchSuccess, $scope.searchFailure);
        }
    });

    $http.get("https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json").success(function(data) {
        $scope.languages = data;
        console.log(data);
    });
}]);

app.controller("MyStatsController", ['$scope', function($scope) {

}]);

app.service("Github", ['$http', function($http) {

    var baseurl = "https://api.github.com/";

    return {
        searchRepos: function(query, page, callback, error) {
            var url = baseurl + "search/repositories?q=" + encodeURIComponent(query) + "&page="+page+"&sort=stars&order=desc";
            console.log(url);
            $http.get(url).success(function(data, status, headers, config) {
                console.log(headers('X-RateLimit-Limit'));
                callback(data, status, headers, config);
            }).error(error);
        },

        searchRepoByLang: function(lang, min_star, page, callback, error) {
            this.searchRepos("stars:>=" + min_star + " language:" + lang, page, callback, error);
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

app.directive("navbar", function() {
    return {
        templateUrl: 'navbar.html'
        // scope: {
        //     details: '='
        // }
    };
});
