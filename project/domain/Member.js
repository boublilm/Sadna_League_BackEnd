const DButils = require("../utils/DButils");
const bcrypt = require("bcryptjs");

async function CheckUsername(username) {
  const users = await DButils.execQuery("SELECT username FROM dbo.sadna_users");

  if (users.find((x) => x.username === username)) return false;
  return true;
}

async function ValidatePassword(username, password) {
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

function CheckLoggedIn(username) {}

exports.CheckUsername = CheckUsername;
exports.ValidatePassword = ValidatePassword;
