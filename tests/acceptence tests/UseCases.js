const api_domain = "http://localhost:3000";
const axios = require('axios');

async function LoginUC(username, password){
    try{
        const login_response = await axios.post(`${api_domain}/Login`, {
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
        await axios.post(`${api_domain}/Logout`);
    } catch(error){

    }
}

exports.LoginUC = LoginUC;
exports.LogoutUC = LogoutUC;