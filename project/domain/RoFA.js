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
  // Appending all possible games
  let array_games = [];
  for (let i = 0; i < all_teams.length; i++) {
    for (let j = i + 1; j < all_teams.length; j++) {
      array_games.push([all_teams[i], all_teams[j]]);
    }
  }
  // Shuffling games
  array_games.sort(() => Math.random() - 0.5);

  for (let i = 0; i < array_games.length; i++) {
    let rand_home = Math.floor(Math.random() * 2);
    let home_team = array_games[i][rand_home].teamName;
    let away_team = array_games[i][1 - rand_home].teamName;
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

  return true;
}

function RemoveGame(game) {

}

function SetGamePolicy(policy, season, league) {

}

function SetPointsPolicy(policy, season, league) {
  
}

function RegisterJudges(judges, season, league) {

}

async function verifyRoFA(user_id) {
  let isMainRoAF = false;
  const RoafDB = await DButils.execQuery("SELECT user_id FROM dbo.sadna_RoAF");
  if (RoafDB.find((x) => x.user_id === user_id)) {
    isMainRoAF = true;
  }
  return isMainRoAF;
}

async function checkRefereeExists(user_id, leagueID, season) {
  const records = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_judges WHERE user_id = '${user_id}' and league = '${leagueID}' and season = '${season}'`
  );
  if (records.length >= 1) {
    throw {
      status: 409,
      message: "User is already registered to the league and season as a judge",
    };
  }
}

async function checkLeagueExists(leagueID) {
  const league = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_leagues WHERE leagueID = '${leagueID}'`
  );
  if (league.length == 0) {
    throw {
      status: 409,
      message: "League ID doesn't exist",
    };
  }
}

async function RegisterReferee(user_id, leagueID, season) {
  await DButils.execQuery(
    `INSERT INTO dbo.sadna_judges (user_id, league, season) VALUES ('${user_id}', '${leagueID}', '${season}')`
  );
}

exports.AddGames = AddGames;
exports.verifyRoFA = verifyRoFA;
exports.checkRefereeExists = checkRefereeExists;
exports.checkLeagueExists = checkLeagueExists;
exports.RegisterReferee = RegisterReferee;
