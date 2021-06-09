const {test,expect} = require('@jest/globals');
const {AddGames} = require('../../project/domain/RoFA');

test('test AddGames  GAME CREATED ',async()=>{
    const ans = await AddGames("2021/2022",'Spanish La Liga');
    console.log(ans,)
    expect(ans).toBeUndefined()
});

test('test AddGames ERROR GAME CREATED',async()=>{
    let ans;
    try{     
        ans = await AddGames("2021/2022","Premier League");
        }catch (error){
        expect(error).toStrictEqual({
            "message": "Games Already Created",
             "status": 401
            })
    }
});