const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const {validateSeasonLeague,getAllGames,checkRefereeExists} = require('../../project/domain/SeasonInLeague');
const user_handler = require('./unitTestHendler');

const newTimeout = 10000;
jest.setTimeout(newTimeout);

let league_name_validateSeasonLeagueValid = 'league_name_test';
let season_name_league_name_testValid = "season_test";
let season_name_league_name_testNotExsistLiga = "season_test_no_liga";
let league_name_validateSeasonLeagueValidNotExsistSeason = 'league_name_test_no_season';
let data_getAllGamesExsist = {
    season: 'season test',
    league:'league test',
    home_team : 'home team test',
    away_team : 'away team test',
    initial_date :(new Date()).toISOString().slice(0, 19).replace("T", " "),
    location : 'location test',
    main_referee : 1,
    second_referee : 2
}
let judgeID_CheckRefereeExist=100;
let league_id_CheckRefereeExist = '1';
let season_name_CheckRefereeExist = "season_test_judge";

beforeAll(async () => {
  //create users for tests
  await user_handler.createLeague(league_name_validateSeasonLeagueValid);
  await user_handler.createSeason(season_name_league_name_testValid);
  await user_handler.createSeason(season_name_league_name_testNotExsistLiga);
  await user_handler.createLeague(league_name_validateSeasonLeagueValidNotExsistSeason);
  await user_handler.createGames(data_getAllGamesExsist);
  judgeID_CheckRefereeExist = await user_handler.createJudge(100,league_id_CheckRefereeExist,season_name_CheckRefereeExist);

})


afterAll(async () =>{
  //delete users made for tests
  await user_handler.deleteLeague(league_name_validateSeasonLeagueValid);
  await user_handler.deleteSeason(season_name_league_name_testValid);
  await user_handler.deleteSeason(season_name_league_name_testNotExsistLiga);
  await user_handler.deleteLeague(league_name_validateSeasonLeagueValidNotExsistSeason);
  await user_handler.deleteGames(data_getAllGamesExsist);
  await user_handler.deleteJudge(judgeID_CheckRefereeExist);
  

});

// ------------------------------------ TEST SeasonInLeague.JS function ------------------------
// validateSeasonLeague Tesing
test('test validateSeasonLeague VALID ',async()=>{
    expect.assertions(1);
    const ans = await validateSeasonLeague(season_name_league_name_testValid,league_name_validateSeasonLeagueValid);
    const league_id = await DButils.execQuery(`SELECT leagueID FROM dbo.sadna_leagues where leagueName='${league_name_validateSeasonLeagueValid}'`);
    expect(ans).toStrictEqual(league_id[0].leagueID)
});

test('test validateSeasonLeague NOT EXISTS LIGA',async()=>{
  expect.assertions(1);
  const ans = await validateSeasonLeague(season_name_league_name_testNotExsistLiga,'not Exist Liga');
  expect(ans).toStrictEqual(-1);

   
});

test('test validateSeasonLeague NOT VALID SEASON',async()=>{
  expect.assertions(1);
  const ans = await validateSeasonLeague("not exsist season",league_name_validateSeasonLeagueValidNotExsistSeason);
  expect(ans).toStrictEqual(-1);

});

// getAllGames
test('test getAllGames EXISTS ',async()=>{
  expect.assertions(1);
  const ans = await getAllGames(data_getAllGamesExsist.season,data_getAllGamesExsist.league);
  const currectAns = await DButils.execQuery(
      `SELECT * FROM dbo.sadna_games where League='${data_getAllGamesExsist.league}' and Season='${data_getAllGamesExsist.season}'`
    );
  expect(ans).toStrictEqual(currectAns)

});

test('test getAllGames NOT EXISTS ',async()=>{
  expect.assertions(1);
    let league = 'not exsist league';
    let season ='not exsist season';
    const ans = await getAllGames(season,league);
    expect(ans).toStrictEqual([])
});

// checkRefereeExists
test('test checkRefereeExists EXISTS ',async()=>{
  expect.assertions(1);
  const ans = await checkRefereeExists(judgeID_CheckRefereeExist,league_id_CheckRefereeExist,season_name_CheckRefereeExist);
  expect(ans).toBe(true)


});

test('test checkRefereeExists NOT EXISTS/VALID ',async()=>{
  expect.assertions(1);
    const ans = await checkRefereeExists(1,null,null);
    expect(ans).toBeUndefined()
});