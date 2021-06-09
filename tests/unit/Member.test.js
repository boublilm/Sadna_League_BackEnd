const {test,expect} = require('@jest/globals');
const {CheckUsername,ValidatePassword,Checkuserid} = require('../../project/domain/Member');

test('test CheckUsername NOT exists',async()=>{
    const ans = await CheckUsername("userNameNotExsist");
    expect(ans).toBe(true)
});

test('test CheckUsername exists',async()=>{
    const ans = await CheckUsername("ladygaga");
    expect(ans).toBe(false)
});


test('test ValidatePassword VALID',async()=>{
    const ans = await ValidatePassword("ladygaga", "lady@56");
    expect(ans).toStrictEqual(
        {
            "country": "USA",
            "email": "ladygaga@gmail.com",
            "first_name": "Stefani",
            "last_name": "Germanotta",
            "password": "$2a$10$A0a7DXFjebGMcSLVUnX5sucWxZD.eK/CKF/AJ74.mKXk2sfXtItNa", 
            "profile_pic": "https://cloudinary.com/",
            "user_id": 1,
            "username": "ladygaga"
        }
    )
});

test('test ValidatePassword NOT VALID worng passsword',async()=>{
    const ans = await ValidatePassword("ladygaga", "worngPassword");
    expect(ans).toStrictEqual(false)
});

test('test ValidatePassword NOT VALID not exist user',async()=>{
    const ans = await ValidatePassword("notExistUser", "lady@56");
    expect(ans).toStrictEqual(false)
});


test('test Checkuserid EXIST',async()=>{
    const ans = await Checkuserid(1);
    expect(ans).toStrictEqual(true)
});

test('test Checkuserid NOT EXIST',async()=>{
    const ans = await Checkuserid(100);
    expect(ans).toStrictEqual(false)
});

