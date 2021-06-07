const DButils = require("../DB Access/DButils");
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
  await game_policy.addGamesByPolicy(season, league, league_id);
}

function RemoveGame(game) {}

function SetGamePolicy(policy, season, league) {}

function SetPointsPolicy(policy, season, league) {}

function RegisterJudges(judges, season, league) {}

function UnregisterJudges(judges, season, league) {}

async function verifyRoFA(user_id) {
  let isMainRoAF = false;
  const RoafDB = await DButils.execQuery(
    "SELECT user_id FROM dbo.sadna_roles WHERE role = 'RoAF'"
  );
  if (RoafDB.find((x) => x.user_id === user_id)) {
    isMainRoAF = true;
  }
  return isMainRoAF;
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

async function RegisterRefereeToSeasonLeague(user_id, leagueID, season) {
  await DButils.execQuery(
    `INSERT INTO dbo.sadna_judges (user_id, league, season) VALUES ('${user_id}', '${leagueID}', '${season}')`
  );
}

exports.AddGames = AddGames;
exports.verifyRoFA = verifyRoFA;
exports.checkLeagueExists = checkLeagueExists;
exports.RegisterRefereeToSeasonLeague = RegisterRefereeToSeasonLeague;
