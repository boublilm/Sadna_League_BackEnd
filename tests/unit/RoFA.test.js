const {test,expect} = require('@jest/globals');
const {verifyRoFA,checkLeagueExists,RegisterRefereeToSeasonLeague} = require('../../project/domain/RoFA');


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
