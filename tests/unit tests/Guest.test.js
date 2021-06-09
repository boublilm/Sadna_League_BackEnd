const {test,expect} = require('@jest/globals');
const {LoginRequest} = require('../../project/domain/Guest');


test('test LoginRequest VALID ',async()=>{
    const ans = await LoginRequest('ladygaga','lady@56');
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

test('test LoginRequest VALID ',async()=>{
    const ans = await LoginRequest(null,'lady@56');
    expect(ans).toStrictEqual(false)
});