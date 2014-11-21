angular.module('TournamentsController', [])

    .controller('tournamentsController', ["$scope", "$q", "Tournaments", function($scope, $http, Tournaments) {

        $scope.formData = {};

        Tournaments.get()
            .success(function(tournaments) {
               $scope.tournaments = tournaments;
            });

        $scope.create = function(tournament) {
            console.log(tournament);
            Tournaments.create(tournament)
                .success(function() {
                   console.log('success');
                });
        };

    }]);