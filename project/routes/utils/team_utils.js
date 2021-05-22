const search_utils = require("./search_utils");

async function getTeamLeagueByTeamName(team_name){
    const team_info = await search_utils.searchTeamByName(team_name);
    return team_info.map((team) => {
        let {legacy_id} = team.data.legacy_id;
        let league_id=legacy_id;       
        return{
            league_id: legacy_id,
        };
      }); 
   
}


function validTeamsLeagues (home_team_name,away_team_name){
    // get teams id
    const home_team_league_id = getTeamLeagueByTeamName(home_team_name);
    const away_team_league_id = getTeamLeagueByTeamName(away_team_name);
    const validation = home_team_league_id === away_team_league_id;
    return {
      valid: validation,
      home_team_league_id: home_team_league_id,
      away_team_league_id: away_team_league_id,
    };
}
exports.validTeamsLeagues = validTeamsLeagues;

