var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const DButils = require("../routes/utils/DButils");
const team_utils = require("./utils/team_utils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});


router.post("/addNewGame", async(req, res, next) => {
  try{
    // only the Representative of the Football Association can add game to a session 
    // dont need to check if the user is RoFA it's a pre-condition
    //session is allways the current one
    // dont need to check if the tema exsist it's a pre-condition
    console.log("req",req.body);
    const home_team_name = req.body.homeTeam;
    const away_team_name = req.body.awayTeam;
    const date = req.body.date;
    const location = req.body.location;
    const session = req.body.session;

    // check both team are in the same leage 
    // const validLeagues = await team_utils.validTeamsLeagues(home_team_name, away_team_name);
    // if (! validLeagues.valid) {
    //   throw { status: 401, message: "Teams are not in the same league!" };
    // }

    //check the teams can play in this date
    const gameDB= await DButils.execQuery(
      "SELECT * FROM dbo.sadna_games"
    );
    if (gameDB.find((x) => x.game_date === date && x.session === session && x.homeTeam == home_team_name && x.awayTeam == away_team_name))
      throw { status: 409, message: "The teams can't play on that date, it's taken" };
    // add the new game to Games table
    const validLeagues = '1';
    console.log('date',date);
    await DButils.execQuery(
      `INSERT INTO dbo.sadna_games (Session, League, HomeTeamName, AwayTeamName,GameDate, Location) VALUES ('${session}','${validLeagues}','${home_team_name}','${away_team_name}','${date}', '${location}')`
    );
    console.log("finished check 4")
    res.status(201).send("Game Added");

  }catch (error) {
    next(error);
  }
});

module.exports = router;
