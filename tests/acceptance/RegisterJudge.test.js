const use_cases = require('./UseCases');
const newTimeout = 10000;
jest.setTimeout(newTimeout);
const user_handler = require('./UserHandler');


beforeAll(async () => {
    await use_cases.LogoutUC();
    //create entities for tests
    await user_handler.createUserForTest("rofa_reg_judge", "password123", "RoFA");
    await user_handler.createUserForTest("referee_reg_judge", "password123", "Referee");
    await user_handler.createUserForTest("fan_reg_judge", "password123", "Fan");
    await user_handler.createLeague("test_league");
    await user_handler.createSeason("test_season");
});

afterEach(async () => {
    await use_cases.LogoutUC();
});

afterAll(async () =>{
    //delete entities made for tests
    await user_handler.deleteUserForTest("rofa_reg_judge");
    await user_handler.deleteUserForTest("referee_reg_judge");
    await user_handler.deleteUserForTest("fan_reg_judge");
    await user_handler.deleteLeague("test_league");
    await user_handler.deleteSeason("test_season");
});

test('successfull register', async () => {
    expect.assertions(2);
    //login with RoFA
    await use_cases.LoginUC("rofa_reg_judge", "password123");
    //register referee to season leage
    const response = await use_cases.RegisterJudgeUC("referee_reg_judge", "test_league", "test_season");
    expect(response.status).toEqual(201);
    expect(response.data).toEqual("Referee Added Successfully");
});

test('unauthorized operation - not logged in', async () => {
    expect.assertions(2);
    //user is not logged in
    const error = (await use_cases.RegisterJudgeUC("referee_reg_judge", "test_league", "test_season")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("user is not authorized");
});

test('unauthorized operation - logged in with non RoFA user', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("fan_reg_judge", "password123");
    //user logged in, but he is not RoFA
    const error = (await use_cases.RegisterJudgeUC("referee_reg_judge", "test_league", "test_season")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("user is not authorized");
});

test('user is not a referee', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_reg_judge", "password123");
    const error = (await use_cases.RegisterJudgeUC("fan_reg_judge", "test_league", "test_season")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("User is not a referee or doesn't exist in system");
});

test('user does not exist', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_reg_judge", "password123");
    const error = (await use_cases.RegisterJudgeUC("not_exist", "test_league", "test_season")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("User is not a referee or doesn't exist in system");
});

test('season does not exist', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_reg_judge", "password123");
    const error = (await use_cases.RegisterJudgeUC("referee_reg_judge", "test_league", "not_exist")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("League or Season Doesn't Exist in DB");
});

test('league does not exist', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_reg_judge", "password123");
    const error = (await use_cases.RegisterJudgeUC("referee_reg_judge", "not_exist", "test_season")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("League or Season Doesn't Exist in DB");
});

test('referee is already registered', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_reg_judge", "password123");
    const error = (await use_cases.RegisterJudgeUC("referee_reg_judge", "test_league", "test_season")).response;
    expect(error.status).toEqual(409);
    expect(error.data).toEqual("User is already registered to the league and season as a judge");
});