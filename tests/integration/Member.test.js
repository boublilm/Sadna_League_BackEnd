const {test,expect} = require('@jest/globals');
const {login, logout} = require("../../project/domain/SystemManager");
const {CheckLoggedIn} = require('../../project/domain/Member');

// ------------------------------------ TEST SystemManager.JS function ------------------------
// CheckLoggedIn Tesing
test('test CheckLoggedIn NOT LOGGED IN', ()=>{
    expect.assertions(1);
    let user_id = 10000000;
    const ans =  CheckLoggedIn(user_id);
    expect(ans).toStrictEqual(false);
});


test('test CheckLoggedIn LOGGED IN', ()=>{
    expect.assertions(1);
    let user_id = 100;
    login(user_id);
    const ans = CheckLoggedIn(user_id);
    logout(user_id);
    expect(ans).toStrictEqual(true);
});