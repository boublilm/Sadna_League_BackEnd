const {test,expect} = require('@jest/globals');
const {addGamesByPolicy} = require('../GamePolicy');


test('test addGamesByPolicy VALID ',async()=>{
    const ans = await addGamesByPolicy('2021/2022','Spanish La Liga',2);
    expect(ans).toBeUndefined()
});

test('test addGamesByPolicy VALID ',async()=>{
    let ans;
    try{     
        ans =await addGamesByPolicy('2021/2022','Spanish La Liga',3);

    }catch (error){
        expect(error).toStrictEqual({
                "status": 409,
                "message": "Not Enough Referees!"
             })
    }
});