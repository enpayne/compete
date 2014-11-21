angular.module('TournamentsService', [])

    .factory('Tournaments', ["$http", function($http) {
        return {
            getAll : function() {
                return $http.get('api/tournaments');
            },
            getTournament : function(id) {
                return $http.get('api/tournaments/' + id);
            },
            updateTournament : function(id, tournament) {
                return $http.put('api/tournaments/' + id, tournament);
            },
            deleteTournament : function(id) {
                return $http.delete('api/tournaments/' + id);
            },
            create : function(tournament) {
                return $http.post('api/tournaments', tournament);
            }
        };
    }]);