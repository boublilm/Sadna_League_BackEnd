const DButils = require("../utils/DButils");

async function AddGames(season, league) {
  // CHECKS IF LEAGUE NAME EXISTS
  const LeagueExist = await DButils.execQuery(
    `SELECT leagueID FROM dbo.sadna_leagues where leagueName='${league}'`
  );
  if (LeagueExist.length < 1) {
    throw { status: 409, message: "League Doesn't Exist in DB" };
  }
  let league_id = LeagueExist[0].leagueID;

  // CHECKS IF GAMES ALREADY CREATED
  const gamesExist = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_games where League='${league}' and Season='${season}'`
  );
  if (gamesExist.length >= 1) {
    throw { status: 401, message: "Games Already Created" };
  }

  // Get All league team names
  const all_teams = await DButils.execQuery(
    `SELECT teamName FROM dbo.sadna_teams where league='${league_id}'`
  );
  let initial_date = new Date();
  initial_date.setDate(initial_date.getDate() + 7);
  const referees = await DButils.execQuery(
    `SELECT user_id FROM dbo.sadna_judges where league='${league_id}' and season='${season}'`
  );
  if (referees.length < 2) {
    throw { status: 409, message: "Not Enough Referees!" };
  }
  for (let i = 0; i < all_teams.length; i++) {
    let home_team = all_teams[i].teamName;
    for (let j = i; j < all_teams.length; j++) {
      if (j == i) {
        continue;
      }
      let away_team = all_teams[j].teamName;
      let location = await DButils.execQuery(
        `SELECT field FROM dbo.sadna_teams where league='${league_id}' and season='${season}' and teamName='${home_team}'`
      );
      await DButils.execQuery(
        `INSERT INTO dbo.sadna_games (Season, League, HomeTeamName, AwayTeamName, GameDate, Location, MainReferee, SecondaryReferee) VALUES
                ('${season}','${league}','${home_team}','${away_team}','${initial_date
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}', '${location[0].field}','${
          referees[0].user_id
        }','${referees[1].user_id}')`
      );
      initial_date.setDate(initial_date.getDate() + 7);
    }
  }

  return true;
}

function RemoveGame(game) {}

function SetGamePolicy(policy, season, league) {}

function SetPointsPolicy(policy, season, league) {}

function RegisterJudges(judjes, season, league) {}

exports.AddGames = AddGames;
