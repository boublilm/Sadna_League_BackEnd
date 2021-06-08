const DButils = require("../DB Access/DButils");

async function getAllLeagueGames() {}

function getAllLeagues() {}

function getAllSeasonsInLeague(league) {}

async function getLeagueDetails() {
  const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
  return leagues;
}

exports.getLeagueDetails = getLeagueDetails;
