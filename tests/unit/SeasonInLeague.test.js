const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const {validateSeasonLeague,getAllGames,checkRefereeExists} = require('../../project/domain/SeasonInLeague');

// ------------------------------------ TEST SeasonInLeague.JS function ------------------------
// validateSeasonLeague Tesing
test('test validateSeasonLeague VALID ',async()=>{
    expect.assertions(1);
    let league_name = 'league_name_test'
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_leagues (leagueName) VALUES ('${league_name}')`
      );
    
      let season = 'season_test'
      await DButils.execQuery(
        `INSERT INTO dbo.sadna_seasons (Season) VALUES ('${season}')`
      );
    const ans = await validateSeasonLeague(season,league_name);
    const league_id = await DButils.execQuery(`SELECT leagueID FROM dbo.sadna_leagues where leagueName='${league_name}'`);
    expect(ans).toStrictEqual(league_id[0].leagueID)

    await DButils.execQuery(
        `DELETE FROM dbo.sadna_leagues WHERE leagueID = '${league_id[0].leagueID}' `
      );
      await DButils.execQuery(
        `DELETE FROM dbo.sadna_seasons WHERE Season = '${season}' `
      );
});

test('test validateSeasonLeague NOT EXISTS LIGA',async()=>{
  expect.assertions(1);
    let league_name = 'not Exist Liga'

    let season = 'season_test'
      await DButils.execQuery(
        `INSERT INTO dbo.sadna_seasons (Season) VALUES ('${season}')`
      );
    const ans = await validateSeasonLeague(season,league_name);
    expect(ans).toStrictEqual(-1);
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_seasons WHERE Season = '${season}' `
      );
   
});

test('test validateSeasonLeague NOT VALID SEASON',async()=>{
  expect.assertions(1);
    let league_name = 'league_name_test'
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_leagues (leagueName) VALUES ('${league_name}')`
      );
    let season = 'season_test'
    const ans = await validateSeasonLeague(season,league_name);
    expect(ans).toStrictEqual(-1);
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_leagues WHERE leagueName = '${league_name}' `
      );
   
});

// getAllGames
test('test getAllGames EXISTS ',async()=>{
  expect.assertions(1);
    let test_data = {
        season: 'season test',
        league:'league test',
        home_team : 'home team test',
        away_team : 'away team test',
        initial_date :(new Date()).toISOString().slice(0, 19).replace("T", " "),
        location : 'location test',
        main_referee : 1,
        second_referee : 2
    }
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_games (Season, League, HomeTeamName, AwayTeamName, GameDate, Location, MainReferee, SecondaryReferee) VALUES
        ('${test_data.season}','${test_data.league}','${test_data.home_team}','${test_data.away_team}',
        '${test_data.initial_date}', '${test_data.location}','${test_data.main_referee}','${test_data.second_referee}')`);
      
    const ans = await getAllGames(test_data.season,test_data.league);
    const currectAns = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_games where League='${test_data.league}' and Season='${test_data.season}'`
      );
    expect(ans).toStrictEqual(currectAns)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_games WHERE League='${test_data.league}' and Season='${test_data.season}' `
      );
});

test('test getAllGames NOT EXISTS ',async()=>{
  expect.assertions(1);
    let league = 'league test';
    let season ='season_test';
    const ans = await getAllGames(season,league);
    expect(ans).toStrictEqual([])
});

// checkRefereeExists
test('test checkRefereeExists EXISTS ',async()=>{
  expect.assertions(1);
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_judges`
      );
    let notIn=false
    let Referee_id = 100
    let league = 95
    let season = 'season_test'
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === Referee_id)
        if(!isFind){
            notIn = true
        }
        else{
        Referee_id = Referee_id+1
        }

    }
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_judges (user_id,league,season) VALUES ('${Referee_id}','${league}','${season}')`
      );
    const ans = await checkRefereeExists(Referee_id,league,season);
    expect(ans).toBe(true)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_judges WHERE season='${season}' `
      );

});

test('test checkRefereeExists NOT EXISTS/VALID ',async()=>{
  expect.assertions(1);
    const ans = await checkRefereeExists(1,null,null);
    expect(ans).toBeUndefined()
});