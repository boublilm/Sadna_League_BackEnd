const {test,expect} = require('@jest/globals');
const DButils = require("../../project/DB Access/DButils");
const {addGamesByPolicy} = require('../../project/domain/GamePolicy');
// jest.setTimeout(200000)

test('test addGamesByPolicy VALID ',async()=>{
    let season = '2021/2022';
    let league = 'Spanish La Liga';
    let league_id = 2;
    const ans = await addGamesByPolicy(season,league,league_id);
    expect(ans).toBeUndefined();
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_games WHERE Season = '${season}' and League ='${league}'`
      );
      


},200000);

test('test addGamesByPolicy NOT VALID ',async()=>{
    let season = '2021/2022'
    let league = 'Spanish La Liga'
    let league_id = 3
    try{     
        const ans =await addGamesByPolicy(season,league,league_id);

    }catch (error){
        expect(error).toStrictEqual({
                "status": 409,
                "message": "Not Enough Referees!"
             })
    }
});