angular.module('TournamentsService', [])

    .factory('Tournaments', ["$http", function($http) {
        return {
            get : function() {
                return $http.get('api/tournaments');
            }
        };
    }]);