const use_cases = require('./UseCases');
const newTimeout = 10000;
jest.setTimeout(newTimeout);
const user_handler = require('./UserHandler');


beforeAll(async () => {
    await use_cases.LogoutUC();
    await user_handler.createUserForTest("rofa_user_assign", "password123", "RoFA");
    await user_handler.createUserForTest("fan1_user_assign", "password123", "Fan");
    //await user_handler.createUserForTest("fan2_user_assign", "password123", "Fan");
});

afterEach(async () => {
    await use_cases.LogoutUC();
});

afterAll(async () =>{
    await user_handler.deleteUserForTest("rofa_user_assign");
    await user_handler.deleteUserForTest("fan1_user_assign");
    //await user_handler.deleteUserForTest("fan2_user_assign");
});

test('successfull assign', async () => {
    expect.assertions(2);
    //login with RoFA
    await use_cases.LoginUC("rofa_user_assign", "password123");
    //assign user1 as referee
    const response = await use_cases.AssignRefereeUC("fan1_user_assign");
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("user has been assigned to be a referee");
});