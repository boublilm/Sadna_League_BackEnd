const DButils = require("../DB Access/DButils");
const system_manager = require("./SystemManager");
const bcrypt = require("bcryptjs");

async function CheckUsername(username) {
  //verify if username exist
  const users = await DButils.execQuery("SELECT username FROM dbo.sadna_users");

  if (users.find((x) => x.username === username)) return false;
  return true;
}

async function ValidatePassword(username, password) {
  //validat user password match the one in DB
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

function CheckLoggedIn(user_id) {
  //check if user is already logged in
  return system_manager.verifyLoggedIn(user_id);
}

async function Checkuserid(user_id) {
  //verify if user_id exist
  const users = await DButils.execQuery("SELECT user_id FROM dbo.sadna_users");
  if (users.find((x) => x.user_id == user_id)) return true;
  return false;
}

exports.CheckUsername = CheckUsername;
exports.ValidatePassword = ValidatePassword;
exports.CheckLoggedIn = CheckLoggedIn;
exports.Checkuserid = Checkuserid;
