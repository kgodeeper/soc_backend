const connect = require('./utils');

const set_pay_success = (order,payid)=>{
     return new Promise((rs,rj)=>{
          sql = `UPDATE payment SET PayID = '${payid}',status=1 WHERE order_item = '${order}'`;
          connect.query(sql,(error,result)=>{
               error ? rj(error) : rs(result);
          })
     })
}

module.exports = {
     set_pay_success
}