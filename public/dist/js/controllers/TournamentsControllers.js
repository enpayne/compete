angular.module('TournamentControllers', [])

    .controller('tournamentListController', ["$scope", "$location", "$routeParams", "Tournaments", "User", function($scope, $location, $routeParams, Tournaments, User) {

        User.get()
            .success(function(user) {
                if (user) {
                    $scope.signedIn = true;
                }
                $scope.user = user;
            });

        Tournaments.getAll()
            .success(function(tournaments) {
                $scope.tournaments = tournaments;
            });

        $scope.delete = function(tournament) {
            Tournaments.deleteTournament(tournament._id)
                .success(function() {
                    $location.path('#/tournaments');
                });
        };

        $scope.canEdit = function(tournament) {
            return $scope.signedIn && $scope.user.facebook.id == tournament._owner.facebook.id;
        }

    }])

    .controller('tournamentEditController', ["$scope", "$location", "$routeParams", "Tournaments", function($scope, $location, $routeParams, Tournaments) {
        $scope.editCase = true;

        var tournamentId = $routeParams.tournamentId;

        Tournaments.getGameTypes()
            .success(function(gameTypes) {
                $scope.gameTypes = gameTypes;
            });

        Tournaments.getTournament(tournamentId)
            .success(function(tournament) {
                tournament.startDate = toISO(tournament.startDate);
                tournament.endDate = toISO(tournament.endDate);
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
        $scope.createCase = true;

        var tournament = {};
        var startDate = new Date();
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);

        tournament.startDate = toISO(startDate);
        tournament.endDate = toISO(endDate);

        $scope.tournament = tournament;

        Tournaments.getGameTypes()
            .success(function(gameTypes) {
                $scope.gameTypes = gameTypes;
                $scope.tournament.gameType = gameTypes[0];
            });

        $scope.save = function(tournament) {
            Tournaments.create(tournament)
                .success(function() {
                    $location.path('#/tournaments');
                });
        };

        $scope.cancel = function() {
            $location.path('#/tournaments');
        };
    }]);

    var toISO = function(dateString) {
        return new Date(dateString).toISOString().split("T")[0];
    };

