const DButils = require("../DB Access/DButils");

function setGamePolicy(game_policy, season, league) {}

function setPointsPolicy(points_policy, season, league) {}

function registerJudge(judge, season, league) {}

async function validateSeasonLeague(season, league) {
  // CHECKS IF LEAGUE NAME EXISTS
  const LeagueExist = await DButils.execQuery(
    `SELECT leagueID FROM dbo.sadna_leagues where leagueName='${league}'`
  );
  if (LeagueExist.length < 1) {
    return -1;
  }
  let league_id = LeagueExist[0].leagueID;

  //check season
  const SeasonExist = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_seasons where Season='${season}'`
  );
  if (SeasonExist.length < 1) {
    return -1;
  }
  return league_id;
}

async function getAllGames(season, league) {
  const games = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_games where League='${league}' and Season='${season}'`
  );
  return games;
}

async function checkRefereeExists(user_id, leagueID, season) {
  const records = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_judges WHERE user_id = '${user_id}' and league = '${leagueID}' and season = '${season}'`
  );
  if (records.length > 0) {
    return true;
  }
}

exports.validateSeasonLeague = validateSeasonLeague;
exports.getAllGames = getAllGames;
exports.checkRefereeExists = checkRefereeExists;
