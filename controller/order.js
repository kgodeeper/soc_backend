const orderDAO = require('../dao/order');
const jwt = require('../dao/jwt');

const add_order = (req,res)=>{
     let token = req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.status(500).json({error});
          else{
               customer = result.account;
               payment = req.body.payment;
               address = req.body.address;
               cart = req.body.cart;
               console.log({customer,address,payment,cart})
               orderDAO.add_order({customer,address,payment,cart})
               .then((data)=>{
                    res.status(200).json({order:data});
               })
               .catch((error)=>{
                    console.log({error});
                    res.status(500).json({error});
               })
          }
     })
}

const get_orders = (req,res)=>{
     let token = req.get('Authorization').split(' ')[1];
     jwt.decoder(token,(error,result)=>{
          if(error) return res.status(500).json({error});
          else{
               customer = result.account;
               orderDAO.get_orders(customer)
               .then((data)=>{
                    res.status(200).json({orders:data});
               })
               .catch((error)=>{
                    res.status(500).json({error});
               })
          }
     })
}

const get_order_cart = (req,res)=>{
     let order = req.body.order;
     console.log(order);
     orderDAO.get_order_cart(order)
     .then((data)=>{
          res.status(200).json({order_carts:data})
     })
     .catch((error)=>{
          return res.status(500).json({error});
     })
}

const get_all_order = (req,res)=>{
     orderDAO.get_all_order()
     .then((data)=>{
          res.status(200).json({orders:data});
     })
     .catch((error)=>{
          console.log(error);
     })
}

const change_status = (req,res)=>{
     product = req.body.product
     stt = req.body.status;
     orderDAO.change_status(product,stt)
     .then((data)=>{
          res.status(200).json({orders:data});
     })
     .catch((error)=>{
          console.log(error);
     })
}

module.exports = {
     add_order,
     get_orders,
     get_order_cart,
     get_all_order,
     change_status
}