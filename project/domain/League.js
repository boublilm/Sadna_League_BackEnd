const DButils = require("../DB Access/DButils");

async function getAllLeagueGames(){

}

function getAllLeasues(){

}

function getAllSeasonsInLeague(league){
    
}
// exports.getLeagueDetails = async ()=>{
//     const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
//     return leagues;
// }

async function getLeagueDetails() {
    const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
    return leagues;
}

exports.getLeagueDetails = getLeagueDetails;
// module.exports = getLeagueDetails;