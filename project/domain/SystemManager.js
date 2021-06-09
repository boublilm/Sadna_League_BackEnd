const DButils = require("../DB Access/DButils");
const { get } = require("../service/auth");
let logged_users = [];

function login(user_id){
    logged_users.push(user_id);
}

function logout(user_id){
    const index = logged_users.indexOf(user_id);
    if (index > -1) {
        logged_users.splice(index, 1);
    }
}

function verifyLoggedIn(user_id){
    let logged_in = false;
    logged_users.forEach(user => {
        if (user == user_id){
            logged_in = true;
        }
    });
    return logged_in;
}

function DeleteTeam(team){
    
}

async function getAllUsers(){
    const all_users = await DButils.execQuery(`SELECT U.*, R.role 
        FROM dbo.sadna_users as U, dbo.sadna_roles as R
        WHERE U.user_id = R.user_id`);
    return all_users;
}

function getLoggedUsers(){
    return logged_users;
}

exports.login = login;
exports.logout = logout;
exports.verifyLoggedIn = verifyLoggedIn;
exports.getAllUsers = getAllUsers;
exports.getLoggedUsers = getLoggedUsers;
