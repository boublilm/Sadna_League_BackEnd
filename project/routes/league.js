var express = require("express");
var router = express.Router();
const league_utils = require("../domain/utils/league_utils");
const DButils = require("../domain/utils/DButils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllGames", async (req, res, next) => {
  try {
    const all_games = await DButils.execQuery(`SELECT * FROM dbo.sadna_games`);
    res.send(all_games);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
