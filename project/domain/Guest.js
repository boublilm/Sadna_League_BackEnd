const DButils = require("../DB Access/DButils");
const Member_Functions = require("./Member");
const bcrypt = require("bcryptjs");

async function LoginRequest(username, password) {
  // check that username exists & the password is correct
  const user = await Member_Functions.ValidatePassword(username, password);
  if (user == false) {
    return false;
  }
  return user;
}

async function Register(username, password, usertype, details) {
  //check if username already exist in system
  if ((await Member_Functions.CheckUsername(username)) == false) {
    return false;
  }

  //hash the password
  let hash_password = bcrypt.hashSync(
    password,
    parseInt(process.env.bcrypt_saltRounds)
  );
  password = hash_password;

  // add the new user to DB
  await DButils.execQuery(
    `INSERT INTO dbo.sadna_users (username, password, first_name, last_name, country, email, profile_pic) VALUES ('${username}', '${hash_password}', '${details.body.firstname}', '${details.body.lastname}', '${details.body.country}', '${details.body.email}', '${details.body["image-url"]}')`
  );
  return true;
}

exports.Register = Register;
exports.LoginRequest = LoginRequest;
