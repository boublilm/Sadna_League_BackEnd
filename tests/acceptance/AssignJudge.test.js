const use_cases = require('./UseCases');
const newTimeout = 10000;
jest.setTimeout(newTimeout);
const user_handler = require('./UserHandler');


beforeAll(async () => {
    await use_cases.LogoutUC();
    //create users for tests
    await user_handler.createUserForTest("rofa_user_assign", "password123", "RoFA");
    await user_handler.createUserForTest("fan1_user_assign", "password123", "Fan");
    await user_handler.createUserForTest("fan2_user_assign", "password123", "Fan");
    await user_handler.createUserForTest("referee_user_assign", "password123", "Referee");
});

afterEach(async () => {
    await use_cases.LogoutUC();
});

afterAll(async () =>{
    //delete users made for tests
    await user_handler.deleteUserForTest("rofa_user_assign");
    await user_handler.deleteUserForTest("fan1_user_assign");
    await user_handler.deleteUserForTest("fan2_user_assign");
    await user_handler.deleteUserForTest("referee_user_assign");
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

test('unauthorized operation - not logged in', async () => {
    expect.assertions(2);
    //user is not logged in
    const error = (await use_cases.AssignRefereeUC("fan2_user_assign")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("user is not authorized");
});

test('unauthorized operation - logged in with non RoFA user', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("fan1_user_assign", "password123");
    //user logged in, but he is not RoFA
    const error = (await use_cases.AssignRefereeUC("fan2_user_assign")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("user is not authorized");
});

test('user does not exist in system', async () => {
    expect.assertions(2);
    //login with RoFA
    await use_cases.LoginUC("rofa_user_assign", "password123");
    //assign user that does not exist
    const error = (await use_cases.AssignRefereeUC("not_esixt")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("user id not found");
});

test('user is already a referee', async () => {
    expect.assertions(2);
    //login with RoFA
    await use_cases.LoginUC("rofa_user_assign", "password123");
    const error = (await use_cases.AssignRefereeUC("referee_user_assign")).response;
    expect(error.status).toEqual(402);
    expect(error.data).toEqual("user is already a referee");
});