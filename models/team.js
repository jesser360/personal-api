var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//Schema template for books
var TeamSchema = new Schema({
  city: String,
  name: String,
  bestPlayers: String,
  championships: Number,
  currentWinningRecord: Boolean
});

//model to create books and Characters
var Team = mongoose.model('Team', TeamSchema);
//to use on other pgs in app
module.exports = Team;
