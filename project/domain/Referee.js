const DButils = require("../DB Access/DButils");

function UpdateGameScore(game, score) {}

function UpdateGameEventDuringGame(game, event) {}

function UpdateGameEventLogAfterGame(game, eventLog) {}

function ShowAllReferees() {}

async function CheckRefereeExist(referee_id) {
  const refereeIDExists = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_roles WHERE user_id = '${referee_id}' and role = 'Referee'`
  );
  if (refereeIDExists.length > 0) {
    return true;
  }
  return false;
}

exports.CheckRefereeExist = CheckRefereeExist;
