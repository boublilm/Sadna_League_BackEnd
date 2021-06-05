var express = require("express");
var router = express.Router();
const DButils = require("../domain/utils/DButils");
const RoFA_util = require("../domain/roles/RoFA");

router.post("/AddGames", async (req, res, next) => {
  try {
    // only the Representative of the Football Association can add game to a session
    // check the current user is RoAF
    await RoFA_util.verifyRoFA(req.session.user_id);

    await RoFA_util.AddGames(req.body.season, req.body.league_name);

    res.status(201).send("Games Added");
  } catch (error) {
    next(error);
  }
});

router.post("/RegisterReferee", async (req, res, next) => {
  try {
    // only the Representative of the Football Association can register a referee
    // check the current user is RoAF
    await RoFA_util.verifyRoFA(req.session.user_id);

    const records = await DButils.execQuery(
      `SELECT * FROM dbo.sadna_judges WHERE user_id = '${req.body.user_id}' and league = '${req.body.leagueID}' and season = '${req.body.season}'`
    );
    if (records.length >= 1) {
      throw {
        status: 409,
        message:
          "User is already registered to the league and season as a judge",
      };
    }
    const league = await DButils.execQuery(
      `SELECT * FROM dbo.sadna_leagues WHERE leagueID = '${req.body.leagueID}'`
    );
    if (league.length == 0) {
      throw {
        status: 409,
        message: "League ID doesn't exist",
      };
    }
    await DButils.execQuery(
      `INSERT INTO dbo.sadna_judges (user_id, league, season) VALUES ('${req.body.user_id}', '${req.body.leagueID}', '${req.body.season}')`
    );
    res.status(201).send("Referee Added Successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
