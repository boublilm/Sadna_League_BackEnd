var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const DButils = require("../routes/utils/DButils");
const team_utils = require("./utils/team_utils");
let game_id = 1;
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
    // check the current user is RoAF
    let isMainRoAF = false
    const RoafDB = await DButils.execQuery("SELECT user_id FROM dbo.sadna_RoAF");
    if(RoafDB.find((x) => x.user_id === req.session.user_id)){
      isMainRoAF = true
    }
    if(!isMainRoAF){
      throw { status: 401, message: "Only RoAF can add a new game"}
   }   
    //session is allways the current one
    // dont need to check if the tema exsist it's a pre-condition
    const home_team_name = req.body.homeTeam;
    const away_team_name = req.body.awayTeam;
    const date = req.body.date;
    const location = req.body.location;
    const session = req.body.session;
    const mainJudge = req.body.mainJudge;
    const judge1 = req.body.judge1;
    const judge2 = req.body.judge2;
    const judge3 = req.body.judge3
    
    // // check both team are in the same leage 
    const validLeagues = await team_utils.validTeamsLeagues(home_team_name, away_team_name);
    // if (! validLeagues.valid) {
    //   throw { status: 401, message: "Teams are not in the same league!" };
    // }

    //check the teams can play in this date
    const gameDB= await DButils.execQuery("SELECT * FROM dbo.sadna_games");
    if (gameDB.find((x) =>     x.GameDate === date && x.Session === session && x.HomeTeamName == home_team_name && x.AwayTeamName == away_team_name))
      throw { status: 409, message: "The teams can't play on that date, it's taken" };

    // check the judges exsist
    let isMainJudge = false
    let isJudge1 = false
    let isJudge2 = false
    let isJudge3 = false
    const judgeDB = await DButils.execQuery("SELECT user_id FROM dbo.sadna_judges");
    if(judgeDB.find((x) => x.user_id === mainJudge)){
      isMainJudge = true
    }
    if(!isMainJudge){
      throw { status: 401, message: "The mainJudge dost exsist"}
    }
    if(gameDB.find((x) => x.GameDate === date && x.MainJudge === mainJudge)){
      throw { status: 409, message: "The mainJudge can't judge on that date" };

    }
    
    if(judgeDB.find((x) => x.user_id === judge1)){
      isJudge1 = true
    }
    if(!isJudge1){
      throw { status: 401, message: "Judge1 dost exsist"}
    }
    if(gameDB.find((x) => x.GameDate === date && x.Judge1 === judge1)){
      throw { status: 409, message: "Judge1 can't judge on that date" };

    }

    if(judgeDB.find((x) => x.user_id === judge2)){
      isJudge2 = true
    }
    if(!isJudge2){
      throw { status: 401, message: "Judge2 dost exsist"}
    }
    if(gameDB.find((x) => x.GameDate === date && x.Judge2 === judge2)){
      throw { status: 409, message: "Judge2 can't judge on that date" };

    }
    

    if(judgeDB.find((x) => x.user_id === judge3)){
      isJudge3=true
    }
    if(!isJudge3){
      throw { status: 401, message: "Judge3 dost exsist"}
    }
    if(gameDB.find((x) => x.GameDate === date && x.Judge3 === judge3)){
      throw { status: 409, message: "Judge3 can't judge on that date" };

    }

    // add the new game to Games table
    await DButils.execQuery(
      `INSERT INTO dbo.sadna_games (Game_id,Session, League, HomeTeamName, AwayTeamName,GameDate, Location,MainJudge,Judge1,Judge2,Judge3) VALUES 
      ('${game_id}','${session}','${validLeagues.home_team_league_id}','${home_team_name}','${away_team_name}','${date}', '${location}','${mainJudge}','${judge1}','${judge2}','${judge3}')`
    );
    game_id = game_id+1;
    res.status(201).send("Game Added");

  }catch (error) {
    next(error);
  }
});

module.exports = router;
