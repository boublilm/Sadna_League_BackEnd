const {test,expect} = require('@jest/globals');
const {LoginRequest, Register} = require('../../project/domain/Guest');
const user_handler = require('./integrationTestHandler');

const newTimeout = 10000;
jest.setTimeout(newTimeout);

let password = "password123"
let role = "Fan";
let username_LoginRequest = 'user_test_LoginRequest'
let details_RegisterNoValideUserName =  {
    "username": "user_test_LoginRequest",
    "firstname": "user_test",
    "lastname": "user_test",
    "country": "USA",
    "password": "1q1q1q",
    "role": "Fan",
    "email": "ladygaga@gmail.com",
    "image-url": "https://cloudinary.com/"
}

let details_RegisterNoValideRole =  {
    "username": "user_test_RegisterRole",
    "firstname": "user_test",
    "lastname": "user_test",
    "country": "USA",
    "password": "1q1q1q",
    "role": "Not Exsist Role",
    "email": "ladygaga@gmail.com",
    "image-url": "https://cloudinary.com/"
}

beforeAll(async () => {
    //create users for tests
    await user_handler.createUserForTest(username_LoginRequest, password, role);
  })
  
  
  afterAll(async () =>{
    //delete users made for tests
    await user_handler.deleteUserForTest(username_LoginRequest);
  });


// ------------------------------------ TEST Guest.JS function ------------------------
// LoginRequest Tesing
test('test LoginRequest VALID ',async()=>{
    const ans = await LoginRequest(username_LoginRequest,password);
    expect(ans.username).toStrictEqual(username_LoginRequest);
});

test('test LoginRequest NOT VALID Worng username ',async()=>{
    expect.assertions(1);
    const ans = await LoginRequest(null,'lady@56');
    expect(ans).toEqual(false);
});

// Register
test('test Register  NOT VALID USERNAME',async()=>{
    expect.assertions(1);
    const ans = await Register(details_RegisterNoValideUserName.username,details_RegisterNoValideUserName.password,details_RegisterNoValideUserName.role,details_RegisterNoValideUserName);
    expect(ans).toEqual(false);
});

test('test Register  NOT VALID ROLE',async()=>{
    expect.assertions(2);
    try{
        await Register(details_RegisterNoValideRole.username,details_RegisterNoValideRole.password,"not exsist role",details_RegisterNoValideRole);
    } catch(error){
        expect(error.status).toBe(409);
        expect(error.message).toBe("Unkown User Type - Please Pick Fan (More Elements will be added in the future)");
    }   
});




