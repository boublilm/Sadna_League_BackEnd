const {test,expect} = require('@jest/globals');
const system_manager = require("../../project/domain/SystemManager");
const {CheckLoggedIn} = require('../../project/domain/Member');

test('test CheckLoggedIn NOT LOGGED IN',async()=>{
    const ans = await CheckLoggedIn(100);
    expect(ans).toBe(false)
});


test('test CheckLoggedIn LOGGED IN',async()=>{
    system_manager.login(1);
    const ans = await CheckLoggedIn(1);
    expect(ans).toBe(true)
});