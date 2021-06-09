const use_cases = require('./UseCases');
const user_handler = require('./UserHandler');
const newTimeout = 10000;
jest.setTimeout(newTimeout);

beforeAll(async () => {
    await use_cases.LogoutUC();
    await user_handler.createUserForTest("test_user_login", "password123", "Fan");
});

afterEach(async () => {
    await use_cases.LogoutUC();
});

afterAll(async () => {
    await user_handler.deleteUserForTest("test_user_login");
});


test('successfull login', async () => {
    expect.assertions(2);
    const response = await use_cases.LoginUC("test_user_login", "password123");
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("login succeeded");
});

test('wrong username', async () => {
    expect.assertions(2);
    const error = (await use_cases.LoginUC("not_exist", "some_password")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("Username or Password incorrect");
});

test('wrong password', async () => {
    expect.assertions(2);
    const error = (await use_cases.LoginUC("test_user_login", "some_password")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("Username or Password incorrect");
});

test('double login', async () => {
    expect.assertions(2);
    await use_cases.LoginUC("test_user_login", "password123");
    const error = (await use_cases.LoginUC("test_user_login", "password123")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("User already connected with another device");
});