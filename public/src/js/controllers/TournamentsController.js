angular.module('TournamentsController', [])

    .controller('tournamentsController', ["$scope", "$q", "Tournaments", function($scope, $http, Tournaments) {

        Tournaments.get()
            .success(function(tournaments) {
               $scope.tournaments = tournaments;
            });

        $scope.showCreate = function() {
            $http.get("/tournaments/create");
        };

    }]);