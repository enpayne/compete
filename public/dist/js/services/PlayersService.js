angular.module('PlayersService', [])

    .factory('Players', ["$http", function($http) {
        return {
            get : function() {
                return $http.get('api/players');
            },
            create : function(player) {
                return $http.post('api/players', player);
            },
            delete : function(id) {
                return $http.delete('api/players/' + id);
            }
        };
    }]);