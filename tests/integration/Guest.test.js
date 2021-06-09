const {test,expect} = require('@jest/globals');
const {LoginRequest, Register} = require('../../project/domain/Guest');


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


test('test Register  NOT VALID USERNAME',async()=>{
    let details = {"body": {
        "username": "ladygaga",
        "firstname": "ladygaga",
        "lastname": "kni",
        "country": "USA",
        "password": "1q1q1q",
        "role": "Fan",
        "email": "ladygaga@gmail.com",
        "image-url": "https://cloudinary.com/"
      }}
    const ans = await Register('ladygaga','1q1q1q','Fan',details);
    expect(ans).toStrictEqual(false)
});

test('test Register  NOT VALID ROLE',async()=>{
    try{
        let details = {"body": {
            "username": "Dean",
            "firstname": "ladygaga",
            "lastname": "kni",
            "country": "USA",
            "password": "1q1q1q",
            "role": "King",
            "email": "ladygaga@gmail.com",
            "image-url": "https://cloudinary.com/"
        }}
        const ans = await Register('Dean','1q1q1q','King',details);
    } catch(error){
        expect(error).toStrictEqual({
            "status": 409,
            "message": "Unkown User Type - Please Pick Fan (More Elements will be added in the future)"
         })
    }   
});




