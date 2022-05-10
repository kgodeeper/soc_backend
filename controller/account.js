const accountDAO = require('../dao/account');
const jwt = require('../dao/jwt');

const user_login = (req,res)=>{
     username = req.body.usertxt;
     password = req.body.passtxt;
     accountDAO.user_login({username,password})
     .then((result)=>{
          let response;
          if(result.length > 0){
               token = result[0].token;
               if(!jwt.verify_token(token)){
                    token = jwt.sign_token(result[0].username);
                    accountDAO.save_token({username:result[0].username,token})
                    .then(()=>{})
                    .catch((error)=>{
                         return res.status(500).json({error});
                    })
               }
               response = {
                    logged_in:true,
                    account:result[0].username,
                    position:result[0].position,
                    token
               }
          }else{
               response = {
                    logged_in:false,
                    account:null,
                    position:null,
                    token:null
               }
          }
          return res.status(200).json({response})
     })
     .catch((error)=>{
          return res.status(500).json({error})
     })
}

const user_sign = (req,res)=>{
     username = req.body.usertxt;
     password = req.body.passtxt;
     if(password.match(/[A-Za-z\d]{8,}/)){
          accountDAO.user_sign({username,password})
          .then((result)=>{
               let response;
               if(result){
                    response = {
                         sign:true,
                         msg:"signed up"
                    }
               }else{
                    response = {
                         sign:false,
                         msg:"user exist"
                    }
               }
               res.status(200).json({response});
          })
          .catch((error)=>{
               return res.status(500).json({error})
          })
     }else{
          res.status(200).json({response:{
               sign:false,
               msg: 'password only contains number and letter and at least 8 charactor'
          }});
     }
}

const user_permission = (req,res)=>{
     token = req.get('Authorization').split(' ')[1];
     accountDAO.user_permission(token)
     .then((result)=>{
          res.status(200).json({position:result});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

module.exports = {
     user_login,
     user_sign,
     user_permission
}