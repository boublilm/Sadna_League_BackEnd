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
async function deleteGames(League){
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_games WHERE League='${League}' `
      );
}

exports.createUserForTest = createUserForTest;
exports.deleteUserForTest = deleteUserForTest;

exports.deleteGames =deleteGames;