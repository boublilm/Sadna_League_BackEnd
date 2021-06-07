var express = require("express");
var router = express.Router();
const rofa = require("../domain/RoFA");
const Referee = require("../domain/Referee");
const season_league = require("../domain/SeasonInLeague");
const Member = require("../domain/Member");

router.post("/AddGames", async (req, res, next) => {
  try {
    // only the Representative of the Football Association can add game to a session
    // check the current user is RoAF
    const is_rofa = await rofa.verifyRoFA(req.session.user_id);
    if (!is_rofa) {
      throw { status: 401, message: "Only RoAF can add new games" };
    }

    //add the games for season in league automatically by current policy
    await rofa.AddGames(req.body.season, req.body.league_name);

    res.status(201).send("Games Added");
  } catch (error) {
    next(error);
  }
});

router.post("/assignReferee/:user_id", async (req, res, next) => {
  try {
    // check the current user is RoAF
    const is_rofa = await rofa.verifyRoFA(req.session.user_id);
    if (!is_rofa) {
      throw { status: 401, message: "user is not authorized" };
    }

    const userexists = await Member.Checkuserid(req.params.user_id);
    if (!userexists) {
      throw { status: 404, message: "user id not found" };
    }

    const is_ref = await Referee.CheckRefereeExist(req.params.user_id);
    if (is_ref) {
      throw { status: 402, message: "user is already a referee" };
    }

    await rofa.assignUserasReferee(req.params.user_id);

    res.send("user has been assigned to be a referee");
  } catch (error) {
    next(error);
  }
});

router.post("/RegisterReferee", async (req, res, next) => {
  try {
    // only the Representative of the Football Association can register a referee
    // check the current user is RoAF
    const is_rofa = await rofa.verifyRoFA(req.session.user_id);
    if (!is_rofa) {
      throw { status: 401, message: "user is not authorized" };
    }
    const season = req.body.season;
    const league = req.body.league;
    const league_id = await season_league.validateSeasonLeague(season, league); //throws error if not
    const referee_id = req.body.user_id;

    //check if referee user exist
    const user_exist = await Referee.CheckRefereeExist(referee_id);
    if (!user_exist) {
      throw {
        status: 409,
        message: "User is not a referee or doesn't exist in system",
      };
    }

    //check if referee is in league already
    const referee_signed = await season_league.checkRefereeExists(
      referee_id,
      league_id,
      season
    );
    if (referee_signed) {
      throw {
        status: 409,
        message:
          "User is already registered to the league and season as a judge",
      };
    }

    //sign referee to season
    await rofa.RegisterRefereeToSeasonLeague(referee_id, league_id, season);

    res.status(201).send("Referee Added Successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
