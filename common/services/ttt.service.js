(function() {
    angular
        .module('bloggerApp')
        .service('ticTacToe', ticTacToe);

    function ticTacToe($http, authentication) {
        var getByPlayer = function(player) {
            return $http.get('/api/games/' + player);
        };
        var createByPlayers = function(player1, player2) {
            return $http.post('/api/games', { "playerOne": player1, "playerTwo": player2 }, { headers: { Authorization: 'Bearer ' + authentication.getToken() } });
        };
        var deleteByPlayer = function(player) {
            return $http.delete('/api/games/' + player, { headers: { Authorization: 'Bearer ' + authentication.getToken() } });
        };
        var takeTurnById = function(gameId, place) {
            return $http.put('/api/games/' + gameId, { "place": place }, { headers: { Authorization: 'Bearer ' + authentication.getToken() } })
        };

        return {
            getByPlayer: getByPlayer,
            createByPlayers: createByPlayers,
            deleteByPlayer: deleteByPlayer,
            takeTurnById: takeTurnById
        };
    }
})();