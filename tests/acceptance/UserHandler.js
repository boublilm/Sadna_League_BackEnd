const DButils = require("../../project/DB Access/DButils");
const bcrypt = require("bcryptjs");

async function createUserForTest(username, password, role){
    //hash the password
    let hash_password = bcrypt.hashSync(
        password,
        parseInt(process.env.bcrypt_saltRounds)
    );
    password = hash_password;

    // add the new user to DB
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_users (username, password, first_name, last_name, country, email, profile_pic) 
        VALUES ('${username}', '${hash_password}', 'test', 'user', 'Israel', 'email@gmail.com', 'http//url.com')`
    );
    // Get User_id
    const user_id = (await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_users WHERE username = '${username}'`
    ))[0].user_id;

    // Assign role to user
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_roles (user_id, role) VALUES ('${user_id}', '${role}')`
    );
}

async function deleteUserForTest(username){
    // Get User_id
    const user_id = (await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_users WHERE username = '${username}'`
    ))[0].user_id;
    //delete from users table
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_users WHERE user_id = '${user_id}'`
    );
    //delete from role table
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_roles WHERE user_id = '${user_id}'`
    );
}

async function createLeague(league){
    // add the league to DB
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_leagues (leagueName) 
        VALUES ('${league}')`
    );
}

async function deleteLeague(league){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_leagues WHERE leagueName = '${league}'`
    );
}

async function createSeason(season){
    // add the season to DB
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_seasons (Season) 
        VALUES ('${season}')`
    );
}

async function deleteSeason(season){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_seasons WHERE Season = '${season}'`
    );
}

async function addTeams(season, league){
    //get league id
    const league_id = (await DButils.execQuery(
        `SELECT leagueID FROM dbo.sadna_leagues WHERE leagueName = '${league}'`
    ))[0].leagueID;

    addTeam("team_1", season, league_id);
    addTeam("team_2", season, league_id);
    addTeam("team_3", season, league_id);

}

async function addTeam(team_name, season, league_id){
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_teams (teamName, league, season, field) 
        VALUES ('${team_name}', '${season}', '${league_id}', '${team_name} home Stedium')`
    );
}

async function deleteTeams(season, league){
    //get league id
    const league_id = (await DButils.execQuery(
        `SELECT leagueID FROM dbo.sadna_leagues WHERE leagueName = '${league}'`
    ))[0].leagueID;

    await DButils.execQuery(
        `DELETE FROM dbo.sadna_teams WHERE Season = '${season}' AND league = '${league_id}'`
    );
}

exports.createUserForTest = createUserForTest;
exports.deleteUserForTest = deleteUserForTest;

exports.createLeague = createLeague;
exports.deleteLeague = deleteLeague;
exports.createSeason = createSeason;
exports.deleteSeason = deleteSeason;

exports.addTeams = addTeams;
exports.deleteTeams = deleteTeams;