const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');
const {CheckUsername,ValidatePassword,Checkuserid} = require('../../project/domain/Member');
const {Register} = require('../../project/domain/Guest');
const e = require('express');

test('test CheckUsername NOT exists',async()=>{
    const ans = await CheckUsername("userNameNotExsist");
    expect(ans).toBe(true)
});

test('test CheckUsername exists',async()=>{
    let username = 'user_test'
    let password = '123456'
    let first_name = 'first_name_test'
    let last_name = 'last_name_test'
    let country = 'country_test'
    let email = 'test@gmail.com'
    let profile_pic = 'https://test.com/'
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_users (username, password, first_name, last_name,country, email,profile_pic)
         VALUES ('${username}', '${password}','${first_name}','${last_name}','${country}','${email}','${profile_pic}')`
      );
    const ans = await CheckUsername(username);
    expect(ans).toBe(false)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_users WHERE username = '${username}'`
      );
});


test('test ValidatePassword VALID',async()=>{
    let details = {"body": {
        "username": "user_test_ValidatePassword",
        "firstname": "first_name_test",
        "lastname": "last_name_test",
        "country": "country_test",
        "password": "123456",
        "role": "Fan",
        "email": "test@gmail.com",
        "image-url": "https://test.com/"
    }}
    await Register(details.body.username,details.body.password,details.body.role,details);
    const ans = await ValidatePassword(details.body.username, details.body.password);
    const corect_ans = await DButils.execQuery(
        `SELECT * FROM dbo.sadna_users WHERE username = '${details.body.username}'`
      );
    expect(ans).toStrictEqual(corect_ans[0])
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_users WHERE username = '${details.body.username}'`
      );
});

test('test ValidatePassword NOT VALID worng passsword',async()=>{
    let details = {"body": {
        "username": "user_Passwordworng",
        "firstname": "first_name_test",
        "lastname": "last_name_test",
        "country": "country_test",
        "password": "123456",
        "role": "Fan",
        "email": "test@gmail.com",
        "image-url": "https://test.com/"
    }}
    await Register(details.body.username,details.body.password,details.body.role,details);
    const ans = await ValidatePassword(details.body.username, "worngPassword");
    expect(ans).toStrictEqual(false)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_users WHERE username = '${details.body.username}'`
      );
});

test('test ValidatePassword NOT VALID not exist user',async()=>{
    let details = {"body": {
        "username": "user_dWorngUserName",
        "firstname": "first_name_test",
        "lastname": "last_name_test",
        "country": "country_test",
        "password": "123456",
        "role": "Fan",
        "email": "test@gmail.com",
        "image-url": "https://test.com/"
    }}
    await Register(details.body.username,details.body.password,details.body.role,details);
    const ans = await ValidatePassword("notExistUser", details.body.password);
    expect(ans).toStrictEqual(false)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_users WHERE username = '${details.body.username}'`
      );
});


test('test Checkuserid EXIST',async()=>{
    let details = {"body": {
        "username": "user_test_Checkuserid",
        "firstname": "first_name_test",
        "lastname": "last_name_test",
        "country": "country_test",
        "password": "123456",
        "role": "Fan",
        "email": "test@gmail.com",
        "image-url": "https://test.com/"
    }}
    await Register(details.body.username,details.body.password,details.body.role,details);
    let id = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_users WHERE username = '${details.body.username}'`
      );
    const ans = await Checkuserid(id[0].user_id);
    expect(ans).toStrictEqual(true)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_users WHERE username = '${details.body.username}'`
      );
});

test('test Checkuserid NOT EXIST',async()=>{
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_users`
      );
    let notIn=false
    let notExsistId = 100
   
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === notExsistId)
        if(!isFind){
            notIn = true
        }
        else{
        notExsistId = notExsistId+1
        }

    }
    const ans = await Checkuserid(notExsistId);
    expect(ans).toStrictEqual(false)
});

