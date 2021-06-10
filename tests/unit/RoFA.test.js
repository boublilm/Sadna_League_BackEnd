const {test,expect} = require('@jest/globals');
const DButils = require("../../project/DB Access/DButils");
const {verifyRoFA,checkLeagueExists,RegisterRefereeToSeasonLeague,assignUserasReferee} = require('../../project/domain/RoFA');
const { use } = require('../../project/service/auth');
const user_handler = require('./unitTestHendler');

const newTimeout = 10000;
jest.setTimeout(newTimeout);

let rofaID_CheckRefereeExist=100;
let league_name_checkLeagueExists = 'test League';
let judge_id_RegisterRefereeToSeasonLeagueNotExsist = 100;
let league_id_RegisterRefereeToSeasonLeagueNotExsist = 2;
let season_name_RegisterRefereeToSeasonLeagueNotExsist = "season test";
let role_id_assignUserasRefereeExsist = 100;

beforeAll(async () => {
  //create users for tests
  rofaID_CheckRefereeExist = await user_handler.createRoFA(100);
  await user_handler.createLeague(league_name_checkLeagueExists);
  judge_id_RegisterRefereeToSeasonLeagueNotExsist = await user_handler.getNotExsistjudgeId(100);
  role_id_assignUserasRefereeExsist = await user_handler.createRoFA(100);
})


afterAll(async () =>{
  //delete users made for tests
  await user_handler.deleteRoFA(rofaID_CheckRefereeExist);
  await user_handler.deleteLeague(league_name_checkLeagueExists);
  await user_handler.deleteJudge(judge_id_RegisterRefereeToSeasonLeagueNotExsist);
  await user_handler.deleteRoFA(role_id_assignUserasRefereeExsist);

});
// ------------------------------------ TEST RoFA.JS function ------------------------
// verifyRoFA Tesing
test('test verifyRoFA EXIST ',async()=>{
    expect.assertions(1);
    const ans = await verifyRoFA(rofaID_CheckRefereeExist);
    expect(ans).toStrictEqual(true)
   

});

test('test verifyRoFA NOT EXIST',async()=>{
  expect.assertions(1);
  let RoFA_id = await user_handler.getNotExsistRoldId();
    const ans = await verifyRoFA(RoFA_id);
    expect(ans).toStrictEqual(false)
});

// checkLeagueExists
test('test checkLeagueExists EXIST ',async()=>{
  expect.assertions(1);
  let league_id = await DButils.execQuery(
    `SELECT leagueID FROM dbo.sadna_leagues WHERE leagueName='${league_name_checkLeagueExists}'`
  );
  const ans = await checkLeagueExists(league_id[0].leagueID);

  expect(ans).toBeUndefined()
  
});

test('test checkLeagueExists NOT EXIST',async()=>{
  expect.assertions(1);
  try{ 
    let league_id = await user_handler.getNotExsistLeagueId(100);    
    await checkLeagueExists(league_id);
      
  }catch (error){
      expect(error).toStrictEqual({
          "message": "League ID doesn't exist",
            "status": 409
          })
  }
   
});

// RegisterRefereeToSeasonLeague
test('test RegisterRefereeToSeasonLeague NOT EXIST ',async()=>{
  expect.assertions(1);
  await RegisterRefereeToSeasonLeague(judge_id_RegisterRefereeToSeasonLeagueNotExsist,league_id_RegisterRefereeToSeasonLeagueNotExsist,season_name_RegisterRefereeToSeasonLeagueNotExsist);
  const ans = await DButils.execQuery(
      `SELECT * FROM dbo.sadna_judges WHERE user_id = '${judge_id_RegisterRefereeToSeasonLeagueNotExsist}' and league='${league_id_RegisterRefereeToSeasonLeagueNotExsist}' and season='${season_name_RegisterRefereeToSeasonLeagueNotExsist}'`
    );
    expect(ans.length).toBe(1);
    
});

test('test RegisterRefereeToSeasonLeague EXIST ',async()=>{
  expect.assertions(1);
  let judges = await DButils.execQuery(
    `SELECT * FROM dbo.sadna_judges`
  );

  let user_id = judges[0].user_id;
  let league = judges[0].league;
  let season = judges[0].season;
  await RegisterRefereeToSeasonLeague(user_id,league,season);
  const ans = await DButils.execQuery(
      `SELECT * FROM dbo.sadna_judges WHERE user_id = '${user_id}' and league='${league}' and season='${season}'`
    );
  expect(ans.length).toBe(1);
});

// assignUserasReferee
test('test assignUserasReferee OK ',async()=>{
  expect.assertions(1);
  await assignUserasReferee(role_id_assignUserasRefereeExsist);
  const ans = await DButils.execQuery(
      `SELECT role FROM dbo.sadna_roles WHERE user_id = '${role_id_assignUserasRefereeExsist}'`
    );

  expect(ans[0].role).toStrictEqual('Referee')
    
});