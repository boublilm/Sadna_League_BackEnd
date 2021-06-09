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

async function AssignRefereeUC(usename){
    try{
        const all_users = await axios.get(`${api_domain}/Users`);
        const user = all_users.find(x => x.username == username);
        const assign_response = await axios.get(`${api_domain}/assignReferee/${user.user_id}`);
        return assign_response;
    } catch(error){
        return error;
    }

}

exports.LoginUC = LoginUC;
exports.LogoutUC = LogoutUC;
exports.AssignRefereeUC = AssignRefereeUC;