const DButils = require("../utils/DButils");
const season_league = require("../domain/SeasonInLeague");
const game_policy = require("../domain/GamePolicy");

async function AddGames(season, league) {
  //CHECK if league&season is OK
  let league_id = await season_league.validateSeasonLeague(season, league);

  // CHECKS IF GAMES ALREADY CREATED for this season in league
  const games = await season_league.getAllGames(season, league);
  if (games.length > 0) {
    throw { status: 401, message: "Games Already Created" };
  }

  //Add games by policy
  await game_policy.AddGames(season, league, league_id);
}

function RemoveGame(game) {

}

function SetGamePolicy(policy, season, league) {

}

function SetPointsPolicy(policy, season, league) {
  
}

function RegisterJudges(judges, season, league) {

}

async function verifyRoFA(user_id) {
  let isMainRoAF = false;
  const RoafDB = await DButils.execQuery("SELECT user_id FROM dbo.sadna_RoAF");
  if (RoafDB.find((x) => x.user_id === user_id)) {
    isMainRoAF = true;
  }
  return isMainRoAF;
}

async function checkRefereeExists(user_id, leagueID, season) {
  const records = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_judges WHERE user_id = '${user_id}' and league = '${leagueID}' and season = '${season}'`
  );
  if (records.length >= 1) {
    throw {
      status: 409,
      message: "User is already registered to the league and season as a judge",
    };
  }
}

async function checkLeagueExists(leagueID) {
  const league = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_leagues WHERE leagueID = '${leagueID}'`
  );
  if (league.length == 0) {
    throw {
      status: 409,
      message: "League ID doesn't exist",
    };
  }
}

async function RegisterReferee(user_id, leagueID, season) {
  await DButils.execQuery(
    `INSERT INTO dbo.sadna_judges (user_id, league, season) VALUES ('${user_id}', '${leagueID}', '${season}')`
  );
}

exports.AddGames = AddGames;
exports.verifyRoFA = verifyRoFA;
exports.checkRefereeExists = checkRefereeExists;
exports.checkLeagueExists = checkLeagueExists;
exports.RegisterReferee = RegisterReferee;
