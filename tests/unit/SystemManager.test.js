const {test,expect} = require('@jest/globals');
const {login,getLoggedUsers, logout, verifyLoggedIn} = require('../../project/domain/SystemManager');

test('test login OK ',()=>{
    let befor = getLoggedUsers().length
    const ans =  login(1);
    let after = getLoggedUsers().length
    expect(after - befor).toBe(1)
});

test('test logout OK ',()=>{
    let befor = getLoggedUsers().length
    const ans =  logout(1);
    let after = getLoggedUsers().length
    expect(befor - after).toBe(1)
});

test('test verifyLoggedIn LOGGED IN ',()=>{
    login(1);
    const ans =  verifyLoggedIn(1);
    expect(ans).toBe(true)
});

test('test verifyLoggedIn NOT LOGGED IN ',()=>{
    const ans =  verifyLoggedIn(100);
    expect(ans).toBe(false)
});

