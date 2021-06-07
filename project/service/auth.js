var express = require("express");
var router = express.Router();
const Guest_Functions = require("../domain/Guest");
const Member_Functions = require("../domain/Member");
const user_utils = require("../domain/utils/user_utils");

router.post("/Register", async (req, res, next) => {
  try {
    const user = await Guest_Functions.Register(
      req.body.username,
      req.body.password,
      req.body.usertype,
      req
    );
    if (user == false) {
      throw { status: 409, message: "Username taken" };
    }
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    //Validate usernmae & password
    const user = await Guest_Functions.LoginRequest(
      req.body.username,
      req.body.password
    );
    if (user == false) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    //Check if user already logged in
    const user_already_connected = Member_Functions.CheckLoggedIn(user.user_id);
    if (user_already_connected){
      throw { status: 401, message: "User already connected with another device" };
    }

    // Login user
    req.session.user_id = user.user_id;
    user_utils.login(user.user_id);

    res.status(200).send("login succeeded");
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  user_utils.logout(req.session.user_id);
  req.session.reset(); 
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
