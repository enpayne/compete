var tournamatorApp = angular.module('app', ["ngRoute", 'PlayersController', 'PlayersService', 'TournamentsController', 'TournamentsService']);

tournamatorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/tournaments', {
                templateUrl: './partials/tournaments-list.html',
                controller: 'tournamentsController'
            }).
            when('/tournaments/create', {
                templateUrl: './partials/tournaments-create.html',
                controller: 'tournamentsController'
            }).
            otherwise({
                redirectTo: '/tournaments'
            });
    }]);