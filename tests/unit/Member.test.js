const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const user_handler = require('./unitTestHendler');

const newTimeout = 10000;
jest.setTimeout(newTimeout);

const {CheckUsername,ValidatePassword,Checkuserid} = require('../../project/domain/Member');

const password = "password123";
const role = "Fan";
const username_checkUsernameOktest = "user_test";
const username_ValidatePasswordValidTest = "user_test_ValidatePassword";
const username_ValidatePasswordNotValidPassTest = "user_Passwordworng";
const username_ValidatePasswordNotValidUserTest = "user_dWorngUserName";
const username_CheckuseridExsistTest = "user_test_Checkuserid";



beforeAll(async () => {
  //create users for tests
  await user_handler.createUserForTest(username_checkUsernameOktest, password, role);
  await user_handler.createUserForTest(username_ValidatePasswordValidTest, password, role);
  await user_handler.createUserForTest(username_ValidatePasswordNotValidPassTest, password, role);
  await user_handler.createUserForTest(username_ValidatePasswordNotValidUserTest, password, role);
  await user_handler.createUserForTest(username_CheckuseridExsistTest, password, role);
})


afterAll(async () =>{
  //delete users made for tests
  await user_handler.deleteUserForTest(username_checkUsernameOktest);
  await user_handler.deleteUserForTest(username_ValidatePasswordValidTest);
  await user_handler.deleteUserForTest(username_ValidatePasswordNotValidPassTest);
  await user_handler.deleteUserForTest(username_ValidatePasswordNotValidUserTest);
  await user_handler.deleteUserForTest(username_CheckuseridExsistTest);
});


// ------------------------------------ TEST Member.JS function ------------------------
// CheckUsername Tesing
test('test CheckUsername NOT exists',async()=>{
    expect.assertions(1);
    const ans = await CheckUsername("userNameNotExsist");
    expect(ans).toBe(true)
});

test('test CheckUsername exists',async()=>{
    expect.assertions(1);
    const ans = await CheckUsername(username_checkUsernameOktest);
    expect(ans).toBe(false)

});

// ValidatePassword Tesing
test('test ValidatePassword VALID',async()=>{
    expect.assertions(1);
    const ans = await ValidatePassword(username_ValidatePasswordValidTest, password);
    let corect_ans = await DButils.execQuery(
      `SELECT * FROM dbo.sadna_users WHERE username = '${username_ValidatePasswordValidTest}'`
    );
    expect(ans).toStrictEqual(corect_ans[0])
   
});

test('test ValidatePassword NOT VALID worng passsword',async()=>{
    expect.assertions(1);
    const ans = await ValidatePassword(username_ValidatePasswordNotValidPassTest, "worngPassword");
    expect(ans).toStrictEqual(false)
    
});

test('test ValidatePassword NOT VALID not exist user',async()=>{
    expect.assertions(1);
    const ans = await ValidatePassword("notExistUser", password);
    expect(ans).toStrictEqual(false)
    
});

// Checkuserid testing
test('test Checkuserid EXIST',async()=>{
    expect.assertions(1);
    let id = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_users WHERE username = '${username_CheckuseridExsistTest}'`
      );
    const ans = await Checkuserid(id[0].user_id);
    expect(ans).toStrictEqual(true)
    
});

test('test Checkuserid NOT EXIST',async()=>{
    expect.assertions(1);
    const notExsistId = await user_handler.getNotExsistUserId();
    const ans = await Checkuserid(notExsistId);
    expect(ans).toStrictEqual(false)
});

