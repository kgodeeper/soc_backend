const cartDAO = require('../dao/cart');
const jwt     = require('../dao/jwt');

const get_carts = (req,res)=>{
     let token =  req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.sendStatus(500);
          else{
               account = result.account;
               cartDAO.get_carts(account)
               .then((data)=>{
                    res.status(200).json({carts:data});
               })
               .catch((error)=>{
                    res.status(500).json({error});
               })
          }
     })
}

const get_cart = (req,res)=>{
     let token =  req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.sendStatus(500);
          else{
               account = result.account;
               cartDAO.get_cart(account)
               .then((data)=>{
                    res.status(200).json({carts:data});
               })
               .catch((error)=>{
                    res.status(500).json({error});
               })
          }
     })
}

const change_quantity = (req,res)=>{
     cart = req.body.cart;
     quantity = req.body.quantity;
     cartDAO.change_quantity({cart,quantity})
     .then(()=>{
          get_carts(req,res);
     })
     .catch((error)=>{
          res.status(500).json({error})
     })
}

const delete_carts = (req,res)=>{
     let carts = req.body.carts;
     cartDAO.delete_carts(carts)
     .then(()=>{
          get_carts(req,res);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const add_cart = (req,res)=>{
     let token =  req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.sendStatus(500);
          else{
               account = result.account;
               let product = req.body.product;
               let color = req.body.color;
               let size = req.body.size;
               let quantity = req.body.quantity;
               cartDAO.add_cart({account,color,size,product,quantity})
               .then(()=>{
                    res.status(200).json({status:true});
               })
               .catch((error)=>{
                    res.status(500).json({error});
               })
          }
     })
}

const get_all_cart = (req,res)=>{
     cartDAO.get_all_cart()
     .then((data)=>{
          res.status(200).json({carts:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_cartorder = (req,res)=>{
     cartDAO.get_all_cartorder()
     .then((data)=>{
          res.status(200).json({order_carts:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}
module.exports = {
     get_carts,
     get_cart,
     change_quantity,
     delete_carts,
     add_cart,
     get_all_cart,
     get_all_cartorder
}