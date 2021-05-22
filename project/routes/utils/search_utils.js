const axios = require("axios");
//  const { param } = require("../users");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const SEASON_ID = 17328;

// return all teams in the current season = 17328 => in  Superlegue
async function getTeamsBySeason(SEASON_ID){
    let teams_id_array= [];
    const teamsID = await axios.get(`${api_domain}/teams/season/${SEASON_ID}` , {
        params: {
            api_token: process.env.api_token,
        },
    });
    teamsID.data.data.map((teamDetails) =>
        teams_id_array.push(teamDetails.id)
    );
    return teams_id_array;
    }


// param - searchname - the value we are looking by him
// return - all theams that start with this value

async function searchTeamByName(search_name){
    let teams_id_array = await getTeamsBySeason(SEASON_ID);
    let teams_found = extractRelevantTeamName(teams_id_array, search_name)
    return teams_found;
}

exports.searchTeamByName = searchTeamByName;

