var tournamatorApp = angular.module('app',
    [   "ngRoute",
        'TournamentControllers',
        'TournamentsService'
    ]);

tournamatorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/tournaments', {
                templateUrl: './partials/tournaments-list.html',
                controller: 'tournamentListController'
            }).
            when('/tournaments/create', {
                templateUrl: './partials/tournaments-create.html',
                controller: 'tournamentCreateController'
            }).
            when('/tournaments/edit/:tournamentId', {
                templateUrl: './partials/tournaments-create.html',
                controller: 'tournamentEditController'
            }).
            otherwise({
                redirectTo: '/tournaments'
            });
    }]);