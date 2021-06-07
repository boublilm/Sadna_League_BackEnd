var express = require("express");
var router = express.Router();
const DButils = require("../domain/utils/DButils");
const RoFA_util = require("../domain/RoFA");

router.post("/AddGames", async (req, res, next) => {
  try {
    // only the Representative of the Football Association can add game to a session
    // check the current user is RoAF
    const is_rofa = await RoFA_util.verifyRoFA(req.session.user_id);
    if (!is_rofa) {
      throw { status: 401, message: "Only RoAF can add new games" };
    }

    //add the games for season in league automatically by current policy
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
    await RoFA_util.checkLeagueExists(req.body.leagueID);
    await RoFA_util.checkRefereeExists(
      req.body.user_id,
      req.body.leagueID,
      req.body.season
    );

    await RoFA_util.RegisterReferee(
      req.body.user_id,
      req.body.leagueID,
      req.body.season
    );
    res.status(201).send("Referee Added Successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
