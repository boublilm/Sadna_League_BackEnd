const {test,expect} = require('@jest/globals');
const {login} = require("../../project/domain/SystemManager");
const {CheckLoggedIn} = require('../../project/domain/Member');

// ------------------------------------ TEST SystemManager.JS function ------------------------
// CheckLoggedIn Tesing
test('test CheckLoggedIn NOT LOGGED IN',()=>{
    expect.assertions(1);
    let user_id = 10000000;
    const ans =  CheckLoggedIn(user_id);
    expect(ans).toBe(false)
});


test('test CheckLoggedIn LOGGED IN',()=>{
    let user_id = 1;
    login(user_id)
    const ans = CheckLoggedIn(user_id);
    expect(ans).toBe(true)
});