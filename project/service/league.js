var express = require("express");
var router = express.Router();
const league = require("../domain/League");
const games = require("../domain/Game");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllGames", async (req, res, next) => {
  try {
    const all_games = await games.getAllGames();
    res.send(all_games);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
