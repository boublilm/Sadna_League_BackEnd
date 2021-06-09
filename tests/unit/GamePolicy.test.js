const {test,expect} = require('@jest/globals');
const {addGamesByPolicy} = require('../../project/domain/GamePolicy');


// test('test addGamesByPolicy VALID ',async()=>{
//     jest.setTimeout(200000)
//     const ans = await addGamesByPolicy('2021/2022','Spanish La Liga',2);
//     console.log(ans,"=====================")
//     expect(ans).toStrictEqual(true)
// });

test('test addGamesByPolicy NOT VALID ',async()=>{
    try{     
        const ans =await addGamesByPolicy('2021/2022','Spanish La Liga',3);

    }catch (error){
        expect(error).toStrictEqual({
                "status": 409,
                "message": "Not Enough Referees!"
             })
    }
});