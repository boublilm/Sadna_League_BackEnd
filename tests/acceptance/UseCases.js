const api_domain = "http://localhost:3000";
const axios = require('axios');
//make axios work with cookies so we can save session between tests
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();
const axios_with_cookies  = axios.create({
    jar: cookieJar,
    withCredentials: true
    });
axiosCookieJarSupport(axios_with_cookies);

async function LoginUC(username, password){

    try{
        const login_response = await axios_with_cookies.post(`${api_domain}/Login`, {
            username: username,
            password: password
        });
        return login_response;
    } catch(error){
        return error;
    }
}

async function LogoutUC(){
    try{
        await axios_with_cookies.post(`${api_domain}/Logout`);
    } catch(error){

    }
}

async function AssignRefereeUC(username){
    try{
        const all_users = (await axios_with_cookies.get(`${api_domain}/Users`)).data;
        const user = all_users.find(x => x.username == username);
        const assign_response = await axios_with_cookies.post(`${api_domain}/RoFA/assignReferee/${user.user_id}`);
        return assign_response;
    } catch(error){
        return error;
    }
}

exports.LoginUC = LoginUC;
exports.LogoutUC = LogoutUC;
exports.AssignRefereeUC = AssignRefereeUC;