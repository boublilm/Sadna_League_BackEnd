var express = require("express");
var router = express.Router();
const Guest_Functions = require("../domain/Guest");
const Member_Functions = require("../domain/Member");
const system_manager = require("../domain/SystemManager");

router.post("/Register", async (req, res, next) => {
  try {
    const user = await Guest_Functions.Register(
      req.body.username,
      req.body.password,
      req.body.role,
      req
    );
    if (user == false) {
      throw { status: 400, message: "Username taken" };
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
    if (user_already_connected) {
      throw {
        status: 401,
        message: "User already connected with another device",
      };
    }

    // Login user
    req.session.user_id = user.user_id;
    system_manager.login(user.user_id);

    res.status(200).send("login succeeded");
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  system_manager.logout(req.session.user_id);
  req.session.reset();
  res.send({ success: true, message: "logout succeeded" });
});

router.get("/Users", async (req, res, next) => {
  try {
    const users = await system_manager.getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
