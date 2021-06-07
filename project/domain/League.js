const DButils = require("../DB Access/DButils");

async function getAllLeagueGames(){
    const all_games = await DButils.getAllGames();
    return all_games;
}