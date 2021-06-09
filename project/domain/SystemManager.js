const DButils = require("../DB Access/DButils");
let logged_users = [];

function login(username){
    logged_users.push(username);
}

function logout(username){
    const index = logged_users.indexOf(username);
    if (index > -1) {
        logged_users.splice(index, 1);
    }
}

function verifyLoggedIn(username){
    return logged_users.includes(username);
}

function DeleteTeam(team){
    
}

async function getAllUsers(){
    const all_users = await DButils.execQuery(`SELECT U.*, R.role 
        FROM dbo.sadna_users as U, dbo.sadna_roles as R
        WHERE U.user_id = R.user_id`);
    return all_users;
}

exports.login = login;
exports.logout = logout;
exports.verifyLoggedIn = verifyLoggedIn;
exports.getAllUsers = getAllUsers;