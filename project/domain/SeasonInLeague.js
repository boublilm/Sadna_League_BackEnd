const DButils = require("../utils/DButils");

function setGamePolicy(game_policy, season, league){

}

function setPointsPolicy(game_policy, season, league){
    
}

function registerJudge(judge, season, league){

}

async function validateSeasonLeague(season, league){
    // CHECKS IF LEAGUE NAME EXISTS
    const LeagueExist = await DButils.execQuery(
        `SELECT leagueID FROM dbo.sadna_leagues where leagueName='${league}'`
    );
    if (LeagueExist.length < 1) {
        throw { status: 409, message: "League Doesn't Exist in DB" };
    }
    let league_id = LeagueExist[0].leagueID;
     
    //check season
    const SeasonExist = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_seasons where Season='${season}'`
    );
    if (SeasonExist.length < 1) {
        throw { status: 409, message: "Season Doesn't Exist in DB" };
    }
    return league_id;
}

async function getAllGames(season, league){
    const games = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_games where League='${league}' and Season='${season}'`
      );
      return games;
}

exports.validateSeasonLeague = validateSeasonLeague;
exports.getAllGames = getAllGames;