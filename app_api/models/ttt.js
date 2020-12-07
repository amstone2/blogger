var mongoose = require('mongoose');
var tttSchema = new mongoose.Schema({
    board: {
        type: [String],
        "default": ['', '', '', '', '', '', '', '', ''],
        required: true
    },
    playerOne: { type: String, required: true },
    playerTwo: { type: String, required: true },
    currentPlayer: { type: String, required: true }
    
});
mongoose.model('TicTacToe', tttSchema);
