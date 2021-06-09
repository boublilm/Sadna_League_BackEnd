const {test,expect} = require('@jest/globals');
const {validateSeasonLeague,getAllGames,checkRefereeExists} = require('../../project/domain/SeasonInLeague');


test('test validateSeasonLeague VALID ',async()=>{
    const ans = await validateSeasonLeague('2021/2022','Spanish La Liga');
    expect(ans).toStrictEqual(2)
});

test('test validateSeasonLeague NOT EXISTS LIGA',async()=>{
    let ans;
    try{     
        ans = await validateSeasonLeague('2021/2022','not Exist Liga');
       
    }catch (error){
        expect(error).toStrictEqual({
                "status": 404,
                "message": "League Doesn't Exist in DB"
             })
    }
   
});

test('test validateSeasonLeague NOT VALID SEASON',async()=>{
    let ans;
    try{     
        ans = await validateSeasonLeague('2031/2032','Spanish La Liga');
       
    }catch (error){
        expect(error).toStrictEqual({
                "status": 404,
                "message": "Season Doesn't Exist in DB"
             })
    }
   
});

test('test getAllGames EXISTS ',async()=>{
    const ans = await getAllGames('2021/2022','Premier League');
    expect(ans).toStrictEqual(
        [{"AwayTeamName": "Hapoel Marmorak", "GameDate": new Date('2021-06-14T16:17:48Z'), "Game_id": 79, "HomeTeamName": "Hapoel Beer Sheva", "League": "Premier League", "Location": "Terner Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Tel Aviv", "GameDate": new Date('2021-06-21T16:17:48Z'), "Game_id": 80, "HomeTeamName": "Hapoel Beer Sheva", "League": "Premier League", "Location": "Terner Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Haifa", "GameDate": new Date('2021-06-28T16:17:48Z'), "Game_id": 81, "HomeTeamName": "Hapoel Tel Aviv", "League": "Premier League", "Location": "BlumField Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Ramat Gan", "GameDate": new Date('2021-07-05T16:17:48Z'), "Game_id": 82, "HomeTeamName": "Hapoel Tel Aviv", "League": "Premier League", "Location": "BlumField Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Ramat Gan", "GameDate": new Date('2021-07-12T16:17:48Z'), "Game_id": 83, "HomeTeamName": "Maccabi Haifa", "League": "Premier League", "Location": "Sami Ofer Stadium", 
"MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Tel Aviv", "GameDate": new Date('2021-07-19T16:17:48Z'), "Game_id": 84, "HomeTeamName": 
"Hapoel Ramat Gan", "League": "Premier League", "Location": "Ramat Gan Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Tel Aviv", "GameDate": new Date('2021-07-26T16:17:48Z'), "Game_id": 85, "HomeTeamName": "Maccabi Haifa", "League": "Premier League", "Location": "Sami Ofer Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Ramat Gan", "GameDate": new Date('2021-08-02T16:17:48Z'), "Game_id": 86, "HomeTeamName": "Hapoel Beer Sheva", "League": "Premier League", "Location": "Terner Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Marmorak", "GameDate": new Date('2021-08-09T16:17:48Z'), "Game_id": 87, "HomeTeamName": "Hapoel Tel Aviv", "League": "Premier League", "Location": "BlumField Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Haifa", "GameDate": new Date('2021-08-16T16:17:48Z'), "Game_id": 88, "HomeTeamName": "Hapoel Marmorak", "League": "Premier League", "Location": "Iztoni Rehovot", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Tel Aviv", "GameDate": new Date('2021-08-23T16:17:48Z'), "Game_id": 89, "HomeTeamName": "Maccabi Tel Aviv", "League": "Premier League", "Location": "BlumField Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Beer Sheva", "GameDate": new Date('2021-08-30T16:17:48Z'), "Game_id": 90, "HomeTeamName": "Hapoel Tel Aviv", "League": "Premier League", "Location": "BlumField Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Hapoel Marmorak", "GameDate": new Date('2021-09-06T16:17:48Z'), "Game_id": 91, "HomeTeamName": "Hapoel Ramat Gan", "League": "Premier League", "Location": "Ramat Gan Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Haifa", "GameDate": new Date('2021-09-13T16:17:48Z'), "Game_id": 92, "HomeTeamName": "Hapoel Beer Sheva", "League": "Premier League", "Location": "Terner Stadium", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}, {"AwayTeamName": "Maccabi Tel Aviv", "GameDate": new Date('2021-09-20T16:17:48Z'), "Game_id": 93, "HomeTeamName": "Hapoel Marmorak", "League": "Premier League", "Location": "Iztoni Rehovot", "MainReferee": 1, "Season": "2021/2022", "SecondaryReferee": 3}]
    )
});

test('test getAllGames NOT EXISTS ',async()=>{
    const ans = await getAllGames('2031/2032','Spanish La Liga');
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