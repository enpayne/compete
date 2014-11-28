angular.module('TournamentControllers', [])

    .controller('tournamentListController', ["$scope", "$location", "$routeParams", "Tournaments", "User", function($scope, $location, $routeParams, Tournaments, User) {

        User.get()
            .success(function(user) {
                if (user) {
                    $scope.signedIn = true;
                }
                $scope.user = user;
                console.log(user);
            });

        Tournaments.getAll()
            .success(function(tournaments) {
                console.log(tournaments);
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