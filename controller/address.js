const addressDAO = require('../dao/address')
const jwt = require('../dao/jwt');

const get_address = (req,res)=>{
     let token = req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.status(500).json({error});
          else{
               account = result.account;
               addressDAO.get_address(account)
               .then((data)=>{
                    return res.status(200).json({addresses:data});
               })
               .catch((error)=>{
                    return res.status(500).json({error});
               })
          }
     })
}

module.exports = {
     get_address
}