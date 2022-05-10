const voteDAO = require('../dao/vote');
const jwt     = require('../dao/jwt');

const add_vote = (req,res)=>{
     let token = req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.status(500).json({error});
          else{
               customer = result.account;
               product = req.body.product;
               vote = req.body.vote;
               rate = req.body.rate;
               order = req.body.order;
               voteDAO.add_vote({customer,product,vote,rate,order})
               .then(()=>{
                    res.sendStatus(200);
               })
               .catch(()=>{
                    res.sendStatus(500);
               })
          }
     })
}

const get_vote = (req,res)=>{
     let product = req.params.product;
     voteDAO.get_vote(product)
     .then((data)=>{
          res.status(200).json({votes:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

module.exports = {
     add_vote,
     get_vote
}