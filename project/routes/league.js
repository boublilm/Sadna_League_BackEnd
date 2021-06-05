var express = require("express");
var router = express.Router();
const league_utils = require("../domain/utils/league_utils");
const DButils = require("../domain/utils/DButils");
const RoFA_utils = require("../domain/roles/RoFA");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.post("/AddGames", async (req, res, next) => {
  try {
    // only the Representative of the Football Association can add game to a session
    // check the current user is RoAF
    let isMainRoAF = false;
    const RoafDB = await DButils.execQuery(
      "SELECT user_id FROM dbo.sadna_RoAF"
    );
    if (RoafDB.find((x) => x.user_id === req.session.user_id)) {
      isMainRoAF = true;
    }
    if (!isMainRoAF) {
      throw { status: 401, message: "Only RoAF can add a new game" };
    }

    const state = await RoFA_utils.AddGames(
      req.body.season,
      req.body.league_name
    );

    res.status(201).send("Game Added");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
