const DButils = require("../DB Access/DButils");

function addScore(game_id, final_score){

}

async function getAllGames(){
    const all_games = await DButils.execQuery(`SELECT * FROM dbo.sadna_games`);
    return all_games;
}

function addEvent(game_id, event){
    
}

exports.getAllGames = getAllGames;