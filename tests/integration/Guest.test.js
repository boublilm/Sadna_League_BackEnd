const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const bcrypt = require("bcryptjs");
const {LoginRequest, Register} = require('../../project/domain/Guest');

// ------------------------------------ TEST Guest.JS function ------------------------
// LoginRequest Tesing
test('test LoginRequest VALID ',async()=>{
    let details = {
        username: "user_test",
        firstname: "first_name_test",
        lastname: "last_name_test",
        country: "country_test",
        password: "123456",
        role: "Fan",
        email: "test@gmail.com",
        "image-url": "https://test.com/"
    }
    let hash_password = bcrypt.hashSync(
        details.password,
        parseInt(process.env.bcrypt_saltRounds)
      );
    password = hash_password;
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_users (username, password, first_name, last_name,country, email,profile_pic)
         VALUES ('${details.username}', '${hash_password}','${details.first_name}','${details.last_name}','${details.country}','${details.email}','${details.profile_pic}')`
      );
 
    const ans = await LoginRequest(details.username,details.password);
    await DButils.execQuery(
        `DELETE from dbo.sadna_users WHERE username ='${details.username}'`
      );
    expect(ans.username).toStrictEqual(details.username)

    
});

test('test LoginRequest NOT VALID Worng username ',async()=>{
    expect.assertions(1);
    const ans = await LoginRequest(null,'lady@56');
    expect(ans).toStrictEqual(false)
});

// Register
test('test Register  NOT VALID USERNAME',async()=>{
    expect.assertions(1);
    let details =  {
        "username": "ladygaga",
        "firstname": "ladygaga",
        "lastname": "kni",
        "country": "USA",
        "password": "1q1q1q",
        "role": "Fan",
        "email": "ladygaga@gmail.com",
        "image-url": "https://cloudinary.com/"
      }
    const ans = await Register(details.username,details.password,details.role,details);
    expect(ans).toStrictEqual(false)
});

test('test Register  NOT VALID ROLE',async()=>{
    expect.assertions(1);
    try{
        let details =  {
            "username": "Dean",
            "firstname": "ladygaga",
            "lastname": "kni",
            "country": "USA",
            "password": "1q1q1q",
            "role": "King",
            "email": "ladygaga@gmail.com",
            "image-url": "https://cloudinary.com/"
        }
        const ans = await Register(details.username,details.password,details.role,details);
    } catch(error){
        expect(error).toStrictEqual({
            "status": 409,
            "message": "Unkown User Type - Please Pick Fan (More Elements will be added in the future)"
         })
    }   
});




