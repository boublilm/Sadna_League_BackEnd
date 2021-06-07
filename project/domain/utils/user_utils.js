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
    return logged_users.contains(username);
}

exports.login = login;
exports.logout = logout;
exports.verifyLoggedIn = verifyLoggedIn;