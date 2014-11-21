angular.module('PlayersControllers', [])

    .controller('playersController', ["$scope", "$q", "Players", function($scope, $http, Players) {

        $scope.getPlayers = function() {
            Players.get()
                .success(function(players) {
                    $scope.players = players;
                });
        };
    }]);