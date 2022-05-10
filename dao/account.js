const connect = require('./utils');
const encode  = require('./encode');

const user_login = ({username,password})=>{
     return new Promise((rs,rj)=>{
          password = encode(password);
          sql =  `SELECT * FROM account WHERE username='${username}' AND password='${password}' AND isActive=1`;
          connect.query(sql,(error,result)=>{
               if(error){
                    rj(error);
               }else{
                    rs(result);
               }
          })
     })
}

const save_token = ({username,token})=>{
     return new Promise((rs,rj)=>{
          sql =  `UPDATE account SET token='${token}' WHERE username='${username}'`;
          connect.query(sql,(error,result)=>{
               if(error){
                    rj(error);
               }else{
                    rs(result);
               }
          })
     })
}

const user_exist = (username)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM account WHERE username='${username}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj();
               else{
                    if(result.length > 0) rs(true);
                    else rs(false);
               }
          })
     })
}

const check_user_token = (token)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM account WHERE token='${token}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj();
               else{
                    if(result.length > 0) rs(true);
                    else rs(false);
               }
          })
     })
}

const get_user_by_token = (token)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM account WHERE token='${token}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj();
               else{
                    rs(result);
               }
          })
     })
}

const user_sign = ({username,password})=>{
     return new Promise((rs,rj)=>{
          user_exist(username).then((result)=>{
               if(!result){
                    password = encode(password);
                    sql =  `INSERT INTO account(username,password,isActive,position,token) VALUES('${username}','${password}',1,0,'')`;
                    connect.query(sql,(error,result)=>{
                         if(error){
                              rj(error);
                         }else{
                              rs(true);
                         }
                    })
               }else{
                    rs(false)
               }
          }).catch((error)=>{
               rj(error);
          })
     })
}

const user_permission = (token)=>{
     return new Promise((rs,rj)=>{
          get_user_by_token(token)
          .then((result)=>{
               if(result.length > 0){
                    rs(result[0].position);
               }else rj();
          })
          .catch((rj));
     })
}

module.exports = {
     user_login,
     save_token,
     user_sign,
     check_user_token,
     user_permission,
     get_user_by_token
}