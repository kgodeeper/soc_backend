require('dotenv').config();
const jwt = require('jsonwebtoken');

const verify_token = (token)=>{
     if(!token) return false;
     try{
          jwt.verify(token,process.env.SECRET_STRING);
          return true;
     }catch{
          return false;
     }
}

const sign_token = (account)=>{
     return jwt.sign({account},process.env.SECRET_STRING,{expiresIn:'1d'});
}

const decoder = (token, cb)=>{
     try{
          jwt.verify(token,'D842B31AA4F5FC483E9FDC012A1E66C55998BBE352B7CA28DE7591C2BD93E222',(sign,code)=>{
               cb(null,code);
          });
     }catch{
          cb(true,null);
     }
}

module.exports = {
     verify_token,
     sign_token,
     decoder
}