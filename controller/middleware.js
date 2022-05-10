const accountDAO = require('../dao/account');
const jwt = require('../dao/jwt');

const login_require = (req,res,next)=>{
     let token = req.get('Authorization');
     if(!token) return res.sendStatus(401);
     token = token.split(' ')[1];
     if(jwt.verify_token(token)){
          accountDAO.check_user_token(token)
          .then((result)=>{
               if(result){
                    return next();
               }
          })
          .catch((error)=>{
              return res.status(500).json({error});
          })
     }else{
          return res.sendStatus(401);
     }
}

module.exports = {
     login_require
}