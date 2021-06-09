const {test,expect} = require('@jest/globals');
const {getLeagueDetails} = require('../../project/domain/League');
const DButils = require('../../project/DB Access/DButils');


test('test getLeagueDetails OK',async()=>{
    const ans = await getLeagueDetails();
    const corectAns = await DButils.execQuery(`SELECT * FROM dbo.sadna_leagues`)
    expect(ans).toStrictEqual(corectAns)
});
test('test getLeagueDetails NOT OK',async()=>{
    const ans = await getLeagueDetails();
    expect(ans).not.toStrictEqual(
        [
            {
              "leagueID": 1,
              "leagueName": "not exists League"
            },
            {
              "leagueID": 2,
              "leagueName": "not exists Liga"
            }
          ]
        )
});