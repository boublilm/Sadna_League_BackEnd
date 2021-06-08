const DButils = require("../DB Access/DButils");

async function getAllLeagueGames() {}

function getAllLeagues() {}

<<<<<<< HEAD
}

function getAllSeasonsInLeague(league){
    
}
// exports.getLeagueDetails = async ()=>{
//     const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
//     return leagues;
// }
=======
function getAllSeasonsInLeague(league) {}
>>>>>>> 291030d7fd7c311260987299d796e42c2f9a3bb6

async function getLeagueDetails() {
  const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
  return leagues;
}

exports.getLeagueDetails = getLeagueDetails;
<<<<<<< HEAD
// module.exports = getLeagueDetails;
=======
>>>>>>> 291030d7fd7c311260987299d796e42c2f9a3bb6
