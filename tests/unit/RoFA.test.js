const {test,expect} = require('@jest/globals');
const DButils = require("../DB Access/DButils");
const {verifyRoFA,checkLeagueExists,RegisterRefereeToSeasonLeague,AddGames} = require('../../project/domain/RoFA');


test('test verifyRoFA EXIST ',async()=>{
    const ans = await verifyRoFA(1);
    expect(ans).toStrictEqual(true)
});

test('test verifyRoFA NOT EXIST',async()=>{
    const ans = await verifyRoFA(3);
    expect(ans).toStrictEqual(false)
});

test('test checkLeagueExists EXIST ',async()=>{
    const ans = await checkLeagueExists(1);
    expect(ans).toBeUndefined()
});

test('test checkLeagueExists NOT EXIST',async()=>{
    let ans;
    try{     
        ans = await checkLeagueExists(3);
       
    }catch (error){
        expect(error).toStrictEqual({
            "message": "League ID doesn't exist",
             "status": 409
            })
    }
   
});



test('test RegisterRefereeToSeasonLeague EXIST ',async()=>{
    await RegisterRefereeToSeasonLeague(7,2,"2021/2022");
    const ans = await DButils.execQuery(
        "SELECT * FROM dbo.sadna_judges WHERE user_id = 7 and league=2 and season='2021/2022'"
      );
    expect(ans.length).not.toBe(0);
});


