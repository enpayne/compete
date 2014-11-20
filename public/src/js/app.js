var tournamatorApp = angular.module('app', ["ngRoute", 'PlayersController', 'PlayersService', 'TournamentsController', 'TournamentsService']);

tournamatorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/tournaments', {
                templateUrl: './tournaments',
                controller: 'tournamentsController'
            }).
            when('/tournaments/create', {
                templateUrl: '/tournaments/create',
                controller: 'tournamentsController'
            }).
            otherwise({
                redirectTo: '/tournaments'
            });
    }]);