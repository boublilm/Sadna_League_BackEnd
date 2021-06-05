var express = require("express");
var router = express.Router();
const DButils = require("../domain/utils/DButils");
const Member_Functions = require("../domain/roles/Member");
const Guest_Functions = require("../domain/roles/Guest");
const bcrypt = require("bcryptjs");

router.post("/Register", async (req, res, next) => {
  try {
    const res = await Guest_Functions.Register(
      req.body.username,
      req.body.password,
      req
    );
    if (res == false) {
      throw { status: 409, message: "Username taken" };
    }
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    const user = await Guest_Functions.LoginRequest(
      req.body.username,
      req.body.password
    );
    if (user == false) {
      throw { status: 401, message: "Username or Password incorrect" };
    }
    // Set cookie
    req.session.user_id = user.user_id;

    // return cookie
    res.status(200).send("login succeeded");
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
