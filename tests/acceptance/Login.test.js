const use_cases = require('./UseCases');

test('successfull login', async () => {
    expect.assertions(2);
    const response = await use_cases.LoginUC("ladygaga", "lady@56");
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
    const error = (await use_cases.LoginUC("ladygaga", "some_password")).response;
    expect(error.status).toEqual(401);
    expect(error.data).toEqual("Username or Password incorrect");
});