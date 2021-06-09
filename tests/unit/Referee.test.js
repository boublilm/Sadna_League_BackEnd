const {test,expect} = require('@jest/globals');
const DButils = require('../../project/DB Access/DButils');

const {CheckRefereeExist} = require('../../project/domain/Referee');

test('test CheckRefereeExist EXIST',async()=>{
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_roles`
      );
    let notIn=false
    let referee_id = 100
   
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === referee_id)
        if(!isFind){
            notIn = true
        }
        else{
        referee_id = referee_id+1
        }

    }
    await DButils.execQuery(
        `INSERT INTO dbo.sadna_roles(user_id,role) VALUES( '${referee_id}','Referee')`
      );
    const ans = await CheckRefereeExist(referee_id);
    expect(ans).toStrictEqual(true)
    await DButils.execQuery(
        `DELETE FROM dbo.sadna_roles WHERE user_id = '${referee_id}' `
      );
});

test('test CheckRefereeExist NOT EXIST',async()=>{
    let ids = await DButils.execQuery(
        `SELECT user_id FROM dbo.sadna_roles`
      );
    let notIn=false
    let referee_id = 100
   
    while(notIn == false){
        let isFind =  ids.find((x) => x.user_id === referee_id)
        if(!isFind){
            notIn = true
        }
        else{
        referee_id = referee_id+1
        }

    }
    const ans = await CheckRefereeExist(referee_id);
    expect(ans).toStrictEqual(false)
});