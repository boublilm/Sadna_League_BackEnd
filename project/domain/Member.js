const DButils = require("../DB Access/DButils");
const user_utils = require("../utils/user_utils");
const bcrypt = require("bcryptjs");

async function CheckUsername(username) { //verify if username exist
  const users = await DButils.execQuery("SELECT username FROM dbo.sadna_users");

  if (users.find((x) => x.username === username)) return false;
  return true;
}

async function ValidatePassword(username, password) { //validat user password match the one in DB
  const user = (
    await DButils.execQuery(
      `SELECT * FROM dbo.sadna_users WHERE username = '${username}'`
    )
  )[0];

  // check that username exists & the password is correct
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return false;
  }
  return user;
}

function CheckLoggedIn(username) { //check if user is already logged in
  return user_utils.CheckLoggedIn(username);
}

exports.CheckUsername = CheckUsername;
exports.ValidatePassword = ValidatePassword;
exports.CheckLoggedIn = CheckLoggedIn;
