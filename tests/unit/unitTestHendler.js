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

async function getNotExsistUserId(){
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_users`
      );
    let notIn=false
    let notExsistId = 100
   
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === notExsistId)
        if(!isFind){
            notIn = true
        }
        else{
        notExsistId = notExsistId+1
        }
    }

    return notExsistId;
}

async function getNotExsistRoldId(role_id){
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_roles`
      );
    let notIn=false   
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === role_id)
        if(!isFind){
            notIn = true
        }
        else{
            role_id = role_id+1
        }
    }
    return role_id;
}

async function getNotExsistjudgeId(judge_id){
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_judges`
      );
    let notIn=false   
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === judge_id)
        if(!isFind){
            notIn = true
        }
        else{
            judge_id = judge_id+1
        }
    }
    return judge_id;
}

async function createReferee(referee_id){

    referee_id = await getNotExsistRoldId(referee_id);
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_roles(user_id,role) VALUES( '${referee_id}','Referee')`
      );
    
    return referee_id;
}

async function deleteReferee(referee_id){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_roles WHERE user_id = '${referee_id}' `
      );
}

async function createRoFA(rofa_id) {

    rofa_id = await getNotExsistRoldId(rofa_id)
    let role = 'RoFA'
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_roles (user_id, role) VALUES ('${rofa_id}', '${role}')`
      );
    
    return rofa_id;
    
}

async function deleteRoFA(rofa_id){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_roles WHERE user_id = '${rofa_id}'`
      );
}

async function createJudge(judge_id,league,season){
    judge_id = await getNotExsistRoldId(judge_id);
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_judges (user_id,league,season) VALUES ('${judge_id}','${league}','${season}')`
      );
    return judge_id;
}

async function deleteJudge(judge_id){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_judges WHERE user_id = '${judge_id}'`
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

async function getNotExsistLeagueId(league_id){
    let ids = await DButils.execQuery(
        `SELECT leagueID FROM dbo.sadna_leagues`
      );
        let notIn=false
        // let league_id = 100
        while(notIn == false){
            let isFind =  ids.find((x) => x.leagueID === league_id)
            if(!isFind){
                notIn = true
            }
            else{
            league_id = league_id +1
            }
    
        }
    return league_id;
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

async function createGames(test_data){
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_games (Season, League, HomeTeamName, AwayTeamName, GameDate, Location, MainReferee, SecondaryReferee) VALUES
        ('${test_data.season}','${test_data.league}','${test_data.home_team}','${test_data.away_team}',
        '${test_data.initial_date}', '${test_data.location}','${test_data.main_referee}','${test_data.second_referee}')`);
}

async function deleteGames(test_data){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_games WHERE League='${test_data.league}' and Season='${test_data.season}' `
      )
}

exports.createUserForTest = createUserForTest;
exports.deleteUserForTest = deleteUserForTest;

exports.getNotExsistUserId = getNotExsistUserId;
exports.getNotExsistRoldId = getNotExsistRoldId;
exports.getNotExsistjudgeId = getNotExsistjudgeId;

exports.createReferee = createReferee;
exports.deleteReferee =deleteReferee

exports.createJudge =createJudge;
exports.deleteJudge =deleteJudge;

exports.createRoFA = createRoFA;
exports.deleteRoFA = deleteRoFA;

exports.createLeague = createLeague;
exports.deleteLeague = deleteLeague;
exports.getNotExsistLeagueId = getNotExsistLeagueId;

exports.createSeason = createSeason;
exports.deleteSeason = deleteSeason;

exports.createGames = createGames;
exports.deleteGames =deleteGames;