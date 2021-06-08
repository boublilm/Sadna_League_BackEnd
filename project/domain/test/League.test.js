const {test,expect} = require('@jest/globals');
const {getLeagueDetails} = require('../League');


test('test getLeagueDetails OK',async()=>{
    const ans = await getLeagueDetails();
    expect(ans).toStrictEqual(
        [
            {
              "leagueID": 1,
              "leagueName": "Premier League"
            },
            {
              "leagueID": 2,
              "leagueName": "Spanish La Liga"
            }
          ]
        )
});
test('test getLeagueDetails NOT OK',async()=>{
    const ans = await getLeagueDetails();
    expect(ans).not.toStrictEqual(
        [
            {
              "leagueID": 1,
              "leagueName": "Premifer League"
            },
            {
              "leagueID": 2,
              "leagueName": "Spanish La Liga"
            }
          ]
        )
});