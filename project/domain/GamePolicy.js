const DButils = require("../DB Access/DButils");
const season_league = require("./SeasonInLeague");


async function addGamesByPolicy(season, league, league_id){
    // Get All league team names
    const all_teams = await DButils.execQuery(
        `SELECT teamName FROM dbo.sadna_teams where league='${league_id}'`
    );

    //check referees
    const referees = await season_league.getRefereesInSeasonLeague(league_id, season);
    if (referees.length < 2) {
        return -1;
    }

    let initial_date = new Date();
    initial_date.setDate(initial_date.getDate() + 7);
    let games_added = 0;

    // Appending all possible games
    let array_games = [];
    for (let i = 0; i < all_teams.length; i++) {
        for (let j = i + 1; j < all_teams.length; j++) {
        array_games.push([all_teams[i], all_teams[j]]);
        }
    }

    // Shuffling games
    array_games.sort(() => Math.random() - 0.5);
    console.log("array_games.length", array_games.length)
    for (let i = 0; i < array_games.length; i++) {
        //randomize home\away
        let rand_home = Math.floor(Math.random() * 2);
        let home_team = array_games[i][rand_home].teamName;
        let away_team = array_games[i][1 - rand_home].teamName;

        //get location of the game - home team field
        let location = await DButils.execQuery(
        `SELECT field FROM dbo.sadna_teams where league='${league_id}' and season='${season}' and teamName='${home_team}'`
        );

        //add the game to DB
        await DButils.execQuery(
        `INSERT INTO dbo.sadna_games (Season, League, HomeTeamName, AwayTeamName, GameDate, Location, MainReferee, SecondaryReferee) VALUES
                ('${season}','${league}','${home_team}','${away_team}','${initial_date
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}', '${location[0].field}','${
            referees[0].user_id
        }','${referees[1].user_id}')`
        );
        games_added++;

        //increment date
        initial_date.setDate(initial_date.getDate() + 7);

  }

  return games_added;

}

function getAllPolicies(){
    
}