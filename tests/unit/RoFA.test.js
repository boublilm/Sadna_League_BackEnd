const {test,expect} = require('@jest/globals');
const DButils = require("../../project/DB Access/DButils");
const {verifyRoFA,checkLeagueExists,RegisterRefereeToSeasonLeague,assignUserasReferee} = require('../../project/domain/RoFA');
const { use } = require('../../project/service/auth');


test('test verifyRoFA EXIST ',async()=>{
    let user_id = 95
    let role = 'RoFA'
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_roles (user_id, role) VALUES ('${user_id}', '${role}')`
      );
    const ans = await verifyRoFA(user_id);
    expect(ans).toStrictEqual(true)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_roles WHERE user_id = '${user_id}'`
      );

});

test('test verifyRoFA NOT EXIST',async()=>{
  let ids = await DButils.execQuery(
    `SELECT user_id FROM dbo.sadna_roles`
  );
    let notIn=false
    let RoFA_id = 100

    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === RoFA_id)
        if(!isFind){
            notIn = true
        }
        else{
        RoFA_id = RoFA_id+1
        }

    }
    const ans = await verifyRoFA(RoFA_id);
    expect(ans).toStrictEqual(false)
});

test('test checkLeagueExists EXIST ',async()=>{
  let ids = await DButils.execQuery(
    `SELECT leagueID FROM dbo.sadna_leagues`
  );
    let notIn=false
    let league_name = 'test League'

    while(notIn == false){
        let isFind =  ids.find((x) => x.leagueName === league_name)
        if(!isFind){
            notIn = true
        }
        else{
        league_name = league_name +"1"
        }

    }
  
  await DButils.execQuery(
      `INSERT INTO dbo.sadna_leagues (leagueName)
       VALUES ('${league_name}')`
    );
    let league_id = await DButils.execQuery(
      `SELECT leagueID FROM dbo.sadna_leagues WHERE leagueName='${league_name}'`
    );
    const ans = await checkLeagueExists(league_id[0].leagueID);
    expect(ans).toBeUndefined()
    await DButils.execQuery(
      `DELETE FROM dbo.sadna_leagues WHERE leagueID = '${league_id[0].leagueID}'`
    );

});

test('test checkLeagueExists NOT EXIST',async()=>{
  let ids = await DButils.execQuery(
    `SELECT leagueID FROM dbo.sadna_leagues`
  );
    let notIn=false
    let league_id = 100
    while(notIn == false){
        let isFind =  ids.find((x) => x.leagueID === league_id)
        if(!isFind){
            notIn = true
        }
        else{
        league_id = league_id +1
        }

    }
  
    try{     
      let ans = await checkLeagueExists(league_id);
       
    }catch (error){
        expect(error).toStrictEqual({
            "message": "League ID doesn't exist",
             "status": 409
            })
    }
   
});

test('test RegisterRefereeToSeasonLeague NOT EXIST ',async()=>{
  let ids = await DButils.execQuery(
    `SELECT user_id FROM dbo.sadna_judges`
  );
    let notIn=false
    let user_id = 100
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === user_id)
        if(!isFind){
            notIn = true
        }
        else{
        user_id = user_id +1
        }

    }
    let league = 2;
    let season = '2021/2022_test'
    await RegisterRefereeToSeasonLeague(user_id,league,season);
    const ans = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_judges WHERE user_id = '${user_id}' and league='${league}' and season='${season}'`
      );
    expect(ans.length).toBe(1);
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_judges WHERE user_id = '${user_id}' and league='${league}' and season='${season}'`
      );
});

test('test RegisterRefereeToSeasonLeague EXIST ',async()=>{
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

test('test assignUserasReferee OK ',async()=>{

  let ids = await DButils.execQuery(
    `SELECT user_id FROM dbo.sadna_roles`
  );
    let notIn=false
    let user_id = 100
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === user_id)
        if(!isFind){
            notIn = true
        }
        else{
        user_id = user_id +1
        }

    }
    await DButils.execQuery(
      `INSERT INTO dbo.sadna_roles (user_id,role)
       VALUES ('${user_id}','Fan')`
    );

    await assignUserasReferee(user_id);
    const ans = await DButils.execQuery(
        `SELECT role FROM dbo.sadna_roles WHERE user_id = '${user_id}'`
      );
    expect(ans[0].role).toStrictEqual('Referee')
    await DButils.execQuery(
      `DELETE FROM dbo.sadna_roles WHERE user_id = '${user_id}'`
    );
});
