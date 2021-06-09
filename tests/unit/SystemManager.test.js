const {test,expect} = require('@jest/globals');
const {login,getLoggedUsers, logout, verifyLoggedIn} = require('../../project/domain/SystemManager');

// ------------------------------------ TEST SystemManager.JS function ------------------------
// login Tesing
test('test login OK ',()=>{
    expect.assertions(1);
    let befor = getLoggedUsers().length
    const ans =  login(1000);
    let after = getLoggedUsers().length
    expect(after - befor).toBe(1)

    logout(1000);
});

// logout
test('test logout OK ',()=>{
    expect.assertions(1);
    login(1000);

    let befor = getLoggedUsers().length
    const ans =  logout(1000);
    let after = getLoggedUsers().length
    expect(befor - after).toBe(1)
});

// verifyLoggedIn
test('test verifyLoggedIn LOGGED IN ',()=>{
    expect.assertions(1);
    login(1000);
    const ans =  verifyLoggedIn(1000);
    expect(ans).toBe(true)
});

test('test verifyLoggedIn NOT LOGGED IN ',()=>{
    expect.assertions(1);
    const ans =  verifyLoggedIn(100);
    expect(ans).toBe(false)
});