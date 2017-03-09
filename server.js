// require express and other modules
var express = require('express'),
    app = express();
var db = require('./models');
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */
var teams = [
  {_id:1,"city":"Golden State", "name":"Warriors", "bestPlayers":["Stephen Curry","Klay Thompson","Draymond Green"],"winningRecord":"true", "championships":"4" },
  {_id:2,"city":"Los Angeles", "name":"Lakers", "bestPlayers":["Kobe Bryant","Magic Johnson","Shaquille O'neil"],"winningRecord":"false", "championships":"16" },
  {_id:3,"city":"Chicago", "name":"Bulls", "bestPlayers":["Michael Jordan","Scottie Pippen","Derrick Rose"],"winningRecord":"false", "championships":"6" },
  {_id:4,"city":"San Antonio", "name":"Spurs", "bestPlayers":["Tony Parker","Tim Duncan","Kawhi Leonard"],"winningRecord":"true", "championships":"5" }
];
var jesse = [
  {"age":"23","height":"6\'2","awesome":true}
];
app.get('/api/teams/search', function(req,res){
  var search = req.query.q;
  db.Team.findOne({name:search}, function(err,foundTeam){
    if(err){
      return console.log("team not found" + err);
    } res.send(foundTeam);
  });
});

app.get('/', function(req, res) {
    res.sendFile('views/index.html', {
        root: __dirname
    });
});

app.get('/api/profile', function profile(req,res){
  res.json({'data': jesse});
});

app.get('/api/teams', function showAllTeams(req,res){
  db.Team.find(function(err,teams){
    if(err){
      return console.log();
    } res.json(teams);
  });
});

app.get('/api/teams/:id', function getTeam(req,res){
  var teamId = req.params.id;
  db.Team.findById({_id:teamId},function(err,foundDem){
    if(err){
      console.log(err);
    }res.json(foundDem)
  });
});

app.post('/api/teams', function create(req,res){
  var newTeam = {
   city: req.body.city,
   name: req.body.name,
   bestPlayers: req.body.bestPlayers,
   championships: req.body.championships,
   currentWinningRecord: req.body.currentWinningRecord
 }
 db.Team.create(newTeam, function(err, newTeam){
   if(err){
     console.log(err);
   }
   console.log("hellow new team");
   res.json(newTeam);
  });
});

app.put('/api/teams/:id', function update(req,res){
  var id = Number(req.params.id);
  var newCity = req.body.city;
  var newName = req.body.name;
  var newBest = req.body.name;
  var newChamp = req.body.championships;
  var newRecord = req.body.winningRecord;
  teams.forEach(function(team){
    if(Number(team._id) === id){
      team.city = newCity;
      team.name = newName;
      team.bestPlayers = newBest;
      team.championships = newChamp;
      team.winningRecord = newRecord;
      res.json(teams);
    }
  })
})
app.delete('/api/teams/:id', function destroy(req,res){
  var id = Number(req.params.id);
  teams.forEach(function(team,index){
    if(team._id === id){
      teams.splice(index,1);
    };
  });
  res.json(teams);
});

app.get('/api/teams/search', function find(req,res){
  var search = req.query.q;
  var searchTeams=[];
    teams.forEach(function(el){
    if(el.name.toLowerCase().indexOf(search) > -1){
      searchTeams.push(el);
      res.json({data:searchTeams});
    };
  });
});

  app.get('/api', function apiIndex(req, res) {
    res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Lets learn about Jesse!"},
      {method: "POST", path: "/api/teams", description: "Create a new NBA team"},
      {method: "PUT", path: "/api/teams/:id" ,description: "Update an NBA team"},
      {method: "DELETE", path: "/api/teams/:id", description: "Delete an NBA team"},
      {method: "SEARCH", path: "/api/teams/search", desscription: "Search for your favorite NBA team"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
