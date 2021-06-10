const {test,expect} = require('@jest/globals');
const {AddGames} = require('../../project/domain/RoFA');
const user_handler = require('./integrationTestHandler');

const newTimeout = 10000;
jest.setTimeout(newTimeout);

afterAll(async () =>{
    // delete users made for tests
    await user_handler.deleteGames('Spanish La Liga');
  })

test('test AddGames  GAME CREATED ',async()=>{
    const ans = await AddGames("2021/2022",'Spanish La Liga',1);
    expect(ans).toBeGreaterThan(0);
},2000000);

test('test AddGames ERROR GAME CREATED',async()=>{
    const ans = await AddGames("2021/2022","Premier League");
    expect(ans).toBe(-1);
});