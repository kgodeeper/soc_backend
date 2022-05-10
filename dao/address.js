const connect = require('./utils');

const get_address = (account)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM address WHERE customer = '${account}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

module.exports = {
     get_address
}