const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const {CheckRefereeExist} = require('../../project/domain/Referee');
const user_handler = require('./unitTestHendler');

const newTimeout = 10000;
jest.setTimeout(newTimeout);

let refereeID_CheckRefereeExist=100;

beforeAll(async () => {
  //create users for tests
  refereeID_CheckRefereeExist = await user_handler.createReferee(100);
})


afterAll(async () =>{
  //delete users made for tests
  await user_handler.deleteReferee(refereeID_CheckRefereeExist);

});

// ------------------------------------ TEST Referee.JS function ------------------------
// CheckRefereeExist Tesing
test('test CheckRefereeExist EXIST',async()=>{
    const ans = await CheckRefereeExist(refereeID_CheckRefereeExist);
    expect(ans).toStrictEqual(true)
    
});

test('test CheckRefereeExist NOT EXIST',async()=>{
    let referee_id = await user_handler.getNotExsistRoldId(100);
    const ans = await CheckRefereeExist(referee_id);
    expect(ans).toStrictEqual(false)
});