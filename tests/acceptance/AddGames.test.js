const use_cases = require('./UseCases');
const newTimeout = 50000;
jest.setTimeout(newTimeout);
const user_handler = require('./UserHandler');


beforeAll(async () => {
    await use_cases.LogoutUC();
    //create entities for tests
    await user_handler.createUserForTest("rofa_addGames", "password123", "RoFA");
    await user_handler.createUserForTest("referee1_addGames", "password123", "Referee");
    await user_handler.createUserForTest("referee2_addGames", "password123", "Referee");
    await user_handler.createLeague("test_league1");
    await user_handler.createLeague("test_league2");
    await user_handler.createSeason("test_season1");
    await user_handler.createSeason("test_season2");
    await user_handler.addTeams("test_season1", "test_league1");
    await user_handler.addTeams("test_season2", "test_league2");
});


afterEach(async () => {
    await use_cases.LogoutUC();
});

afterAll(async () =>{
    //delete entities made for tests
    await user_handler.deleteUserForTest("rofa_addGames");
    await user_handler.deleteUserForTest("referee1_addGames");
    await user_handler.deleteUserForTest("referee2_addGames");
    await user_handler.deleteSeason("test_season1");
    await user_handler.deleteSeason("test_season2");
    await user_handler.deleteTeams("test_season1", "test_league1");
    await user_handler.deleteTeams("test_season2", "test_league2");
    await user_handler.deleteLeague("test_league1");
    await user_handler.deleteLeague("test_league2");
});


test('successfull add games', async () => {
    expect.assertions(2);
    //login with RoFA & register judges
    await use_cases.LoginUC("rofa_addGames", "password123");
    await use_cases.RejisterJudgeUC("referee1_addGames", "test_league1", "test_season1");
    await use_cases.RejisterJudgeUC("referee2_addGames", "test_league1", "test_season1");

    //register referee to season leage
    const response = await await use_cases.AddGamesUC("test_league1", "test_season1");
    expect(response.status).toEqual(201);
    expect(response.data).toEqual("Games Added");
});

test('no referees for season-league', async () => {
    expect.assertions(2);
    //login with RoFA
    await use_cases.LoginUC("rofa_addGames", "password123");

    const error = (await use_cases.AddGamesUC("test_league1", "test_season2")).response;
    expect(error.status).toEqual(409);
    expect(error.data).toEqual("Not Enough Referees!");
});

test('only 1 referees for season-league', async () => {
    expect.assertions(2);
    //login with RoFA
    await use_cases.LoginUC("rofa_addGames", "password123");
    await use_cases.RejisterJudgeUC("referee1_addGames", "test_league2", "test_season1");

    const error = (await use_cases.AddGamesUC("test_league2", "test_season1")).response;
    expect(error.status).toEqual(409);
    expect(error.data).toEqual("Not Enough Referees!");
});

test('unauthorized operation - not logged in', async () => {
    expect.assertions(2);
    const error = (await use_cases.AddGamesUC("test_league1", "test_season1")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("Only RoFA can add new games");
});

test('unauthorized operation - logged in with non RoFA user', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("referee1_addGames", "password123");
    const error = (await use_cases.AddGamesUC("test_league1", "test_season1")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("Only RoFA can add new games");
});

test('season does not exist', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_addGames", "password123");
    const error = (await use_cases.AddGamesUC("test_league1", "not_exist")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("League or Season Doesn't Exist in DB");
});

test('league does not exist', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_addGames", "password123");
    const error = (await use_cases.AddGamesUC("not_exist", "test_season1")).response;
    expect(error.status).toEqual(404);
    expect(error.data).toEqual("League or Season Doesn't Exist in DB");
});

test('games already created', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_addGames", "password123");
    await use_cases.RejisterJudgeUC("referee1_addGames", "test_league2", "test_season2");
    await use_cases.RejisterJudgeUC("referee2_addGames", "test_league2", "test_season2");

    await use_cases.AddGamesUC("test_league2", "test_season2");
    const error = (await use_cases.AddGamesUC("test_league2", "test_season2")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("Games Already Created");
});

test('no enough teams', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("rofa_addGames", "password123");
    await use_cases.RejisterJudgeUC("referee1_addGames", "test_league1", "test_season2");
    await use_cases.RejisterJudgeUC("referee2_addGames", "test_league1", "test_season2");

    const error = (await use_cases.AddGamesUC("test_league1", "test_season2")).response;
    expect(error.status).toEqual(409);
    expect(error.data).toEqual("Not Enough Teams");
});

