var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");

router.post("/Register", async (req, res, next) => {
  try {
    if (req.session.user_id == undefined) {
      throw { status: 409, message: "User Not Logged In" };
    } else {
      const records = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_mainReferee WHERE user_id = '${req.session.user_id}' and league = '${req.body.leagueID}' and season = '${req.body.season}'`
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
      // Need To be added season check!
      await DButils.execQuery(
        `INSERT INTO dbo.sadna_mainReferee (user_id, league, season) VALUES ('${req.session.user_id}', '${req.body.leagueID}', '${req.body.season}')`
      );
      res.status(201).send("Judge Added Successfully");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
