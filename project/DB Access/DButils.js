require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.tedious_userName,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

exports.execQuery = async function (query) {
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

async function getLeagueDetails() {
  const leagues = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`);
  return leagues;
}

async function getAllGames(){
  try {
    const all_games = await DButils.execQuery(`SELECT * FROM dbo.sadna_games`);
    res.send(all_games);
  } catch (error) {
    next(error);
  }
}


exports.getAllGames = getAllGames;
exports.getLeagueDetails = getLeagueDetails;
