angular.module('TournamentsController', [])

    .controller('tournamentsController', ["$scope", "$location", "Tournaments", function($scope, $location, Tournaments) {

        $scope.formData = {};

        Tournaments.get()
            .success(function(tournaments) {
               $scope.tournaments = tournaments;
            });

        $scope.create = function(tournament) {
            console.log(tournament);
            Tournaments.create(tournament)
                .success(function() {
                    Tournaments.get()
                        .success(function(tournaments) {
                           $location.path('#/tournaments');
                        });
                });
        };

        $scope.cancel = function() {
          $location.path('#/tournaments');
        };

    }]);