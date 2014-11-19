angular.module('PlayersController', [])

    .controller('mainController', ["$scope", "$q", "Players", function($scope, $http, Players) {

        Players.get()
            .success(function(players) {
               $scope.players = players;
            });


    }]);