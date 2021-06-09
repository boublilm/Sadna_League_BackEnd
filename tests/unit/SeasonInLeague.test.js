const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const {validateSeasonLeague,getAllGames,checkRefereeExists} = require('../../project/domain/SeasonInLeague');


test('test validateSeasonLeague VALID ',async()=>{
    const ans = await validateSeasonLeague('2021/2022','Spanish La Liga');
    expect(ans).toStrictEqual(2)
});

test('test validateSeasonLeague NOT EXISTS LIGA',async()=>{
    
    const ans = await validateSeasonLeague('2021/2022','not Exist Liga');
    expect(ans).toStrictEqual(-1);
   
});

test('test validateSeasonLeague NOT VALID SEASON',async()=>{
    const ans = await validateSeasonLeague('2031/2032','Spanish La Liga');
    expect(ans).toStrictEqual(-1);
   
});

test('test getAllGames EXISTS ',async()=>{
    let league = 'Premier League';
    let season ='2021/2022';
    const ans = await getAllGames(season,league);
    const currectAns = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_games where League='${league}' and Season='${season}'`
      );
    expect(ans).toStrictEqual(currectAns)
});

test('test getAllGames NOT EXISTS ',async()=>{
    let league = 'Spanish La Liga';
    let season ='2031/2032';
    const ans = await getAllGames(season,league);
    expect(ans).toStrictEqual([])
});

test('test checkRefereeExists EXISTS ',async()=>{
    const ans = await checkRefereeExists(1,1,'2021/2022');
    expect(ans).toBe(true)
});

test('test checkRefereeExists NOT EXISTS/VALID ',async()=>{
    const ans = await checkRefereeExists(1,null,'2021/2022');
    expect(ans).toBeUndefined()
});