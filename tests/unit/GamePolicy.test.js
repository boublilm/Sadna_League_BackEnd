const {test,expect} = require('@jest/globals');
const DButils = require("../../project/DB Access/DButils");
const {addGamesByPolicy} = require('../../project/domain/GamePolicy');

// ------------------------------------ TEST GamePolicy.JS function ------------------------
// addGamesByPolicy Tesing

test('Test addGamesByPolicy VALID ',async()=>{
    expect.assertions(1);
    let season = '2021/2022';
    let league = 'Spanish La Liga';
    let league_id = 2;
    const ans = await addGamesByPolicy(season,league,league_id);
    
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_games WHERE Season = '${season}' and League ='${league}'`
      );

    expect(ans).toBeGreaterThan(0);
    
},200000);

test('Test addGamesByPolicy NOT VALID ',async()=>{
    expect.assertions(1);
    let season = 'season_test'
    let league = 'season_league_test'
    let league_id = 10000;
    const ans =await addGamesByPolicy(season,league,league_id);
    expect(ans).toStrictEqual(0);
});