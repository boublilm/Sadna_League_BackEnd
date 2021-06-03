const DButils = require("../utils/DButils");

async function getLeagueDetails() {
  const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
  return leagues;
}
exports.getLeagueDetails = getLeagueDetails;
