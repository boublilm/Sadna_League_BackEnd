var express = require("express");
var router = express.Router();
const league_utils = require("../domain/League");
const DButils = require("../DB Access/DButils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllGames", async (req, res, next) => {

});

module.exports = router;
