var mongoose = require('mongoose');
var TicTacToe = mongoose.model('TicTacToe');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.tttGetByPlayer = function(req, res) {
  if (req.params && req.params.player) {
      TicTacToe
          .findOne({
              $or: [
                  { playerOne: req.params.player },
                  { playerTwo: req.params.player }
              ]
          })
          .exec(function(err, game) {
              if (!game) {
                  sendJsonResponse(res, 404, {
                      "message": "Game not found for current player"
                  });
                  return
              } else if (err) {
                  sendJsonResponse(res, 404, err);
                  return;
              }
              sendJsonResponse(res, 200, game);
          });
  } else {
      sendJsonResponse(res, 404, {
          "message": "No player email in request"
      });
  }
};

module.exports.tttTakeTurnById = function(req, res) {
  if (!req.params.gameId || !req.body.place) {
      sendJsonResponse(res, 404, {
          "message": "No gameId or place in request"
      });
      return;
  }
  TicTacToe
      .findById(req.params.gameId)
      .exec(
          function(err, game) {
              if (!game) {
                  sendJsonResponse(res, 404, {
                      "message": "gameId not found"
                  });
                  return;
              } else if (err) {
                  sendJsonResponse(res, 400, err);
                  return;
              }
              game.board.set(req.body.place - 1, game.currentPlayer == game.playerOne ? 'X' : 'O');
              game.currentPlayer = game.currentPlayer == game.playerOne ? game.playerTwo : game.playerOne;
              game.save(function(err, game) {
                  if (err) {
                      sendJsonResponse(res, 404, err);
                  } else {
                      sendJsonResponse(res, 200, game);
                  }
              });
          }
      );
};

module.exports.tttCreateByPlayers = function(req, res) {
  if (req.body.playerOne && req.body.playerTwo) {
      var rand = Math.floor(Math.random() * 2);
      var randomPlayer = rand == 0 ? req.body.playerOne : req.body.playerTwo;

      TicTacToe
          .create({
              playerOne: req.body.playerOne,
              playerTwo: req.body.playerTwo,
              currentPlayer: randomPlayer
          }, function(err, game) {
              if (err) {
                  sendJsonResponse(res, 400, err);
              } else {
                  sendJsonResponse(res, 201, game);
              }
          });
  } else {
      sendJsonResponse(res, 404, {
          "message": "Missing player email in request"
      });
  }
};

module.exports.tttDeleteByPlayer = function(req, res) {
  if (req.params.player) {
      TicTacToe
          .deleteOne({
              $or: [
                  { playerOne: req.params.player },
                  { playerTwo: req.params.player }
              ]
          }, function(err) {
              if (err) {
                  sendJsonResponse(res, 404, err);
                  return;
              }
              sendJsonResponse(res, 204, null);
          });
  } else {
      sendJsonResponse(res, 404, {
          "message": "Missing player email in request"
      })
  }
};