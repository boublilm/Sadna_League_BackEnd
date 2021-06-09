const {test,expect} = require('@jest/globals');
const {CheckRefereeExist} = require('../../project/domain/Referee');

test('test CheckRefereeExist EXIST',async()=>{
    const ans = await CheckRefereeExist(3);
    expect(ans).toStrictEqual(true)
});

test('test CheckRefereeExist NOT EXIST',async()=>{
    const ans = await CheckRefereeExist(1);
    expect(ans).toStrictEqual(false)
});