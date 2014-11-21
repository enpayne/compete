angular.module('TournamentControllers', [])

    .controller('tournamentListController', ["$scope", "$location", "$routeParams", "Tournaments", function($scope, $location, $routeParams, Tournaments) {

        Tournaments.getAll()
            .success(function(tournaments) {
               $scope.tournaments = tournaments;
            });

    }])

    .controller('tournamentEditController', ["$scope", "$location", "$routeParams", "Tournaments", function($scope, $location, $routeParams, Tournaments) {
        var tournamentId = $routeParams.tournamentId;

        Tournaments.getTournament(tournamentId)
            .success(function(tournament) {
               $scope.tournament = tournament;
            });

        $scope.save = function(tournament) {
            Tournaments.updateTournament(tournamentId, tournament)
                .success(function() {
                    $location.path('#/tournaments');
                });
        };

        $scope.cancel = function() {
            $location.path('#/tournaments');
        };
    }])

    .controller('tournamentCreateController', ["$scope", "$location", "$routeParams", "Tournaments", function($scope, $location, $routeParams, Tournaments) {
        $scope.save = function(tournament) {
            Tournaments.create(tournament)
                .success(function() {
                    $location.path('#/tournaments');
                });
        };

        $scope.cancel = function() {
            $location.path('#/tournaments');
        };
    }])


    ;