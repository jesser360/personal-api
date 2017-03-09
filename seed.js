var db = require('./models');

var teams_list = [
{
  city:"Golden State",
  name:"Warriors",
  bestPlayers:["Stephen Curry","Klay Thompson","Draymond Green"],
  championships: 4,
  currentWinningRecord: false
},
{
  city:"Los Angeles",
  name:"Lakers",
  bestPlayers:["Kobe Bryant","Magic Johnson","Shaquille O'neil"],
  championships: 16,
  currentWinningRecord: false
},
{
  city:"Chicago",
  name:"Bulls",
  bestPlayers:["Michael Jordan","Scottie Pippen","Derrick Rose"],
  championships: 6,
  currentWinningRecord: false
},
{
  city:"San Antonio",
  name:"Spurs",
  bestPlayers:["Tony Parker","Tim Duncan","Kawhi Leonard"],
  championships:5,
  currentWinningRecord:true
},
]

db.Team.remove({}, function(err,succ){
  if(err){
    console.log(err);
  } db.Team.create(teams_list, function (err, dbTeams){
   if(err){
     console.log(err);
   } console.log("created " + teams_list.length + " teams. Including: " + dbTeams);
})
})
