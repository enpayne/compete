angular.module('ProfileControllers', [])

    .controller('profileShowController', ["$scope", "$q", "User", function($scope, $http, Users) {

        $scope.getPlayers = function() {
            Players.get()
                .success(function(players) {
                    $scope.players = players;
                });
        };
    }]);