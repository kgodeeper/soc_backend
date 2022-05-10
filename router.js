const express = require('express');
const router = express.Router();

const account = require('./controller/account');
const product = require('./controller/product');
const cart    = require('./controller/cart');
const vote    = require('./controller/vote');
const address = require('./controller/address')
const order   = require('./controller/order');
const payment = require('./controller/payment');
const mdware  = require('./controller/middleware');

router.post('/user-login',(req,res)=>{
     return account.user_login(req,res);
})

router.post('/user-sign',(req,res)=>{
     return account.user_sign(req,res);
})

router.get('/check-permission',mdware.login_require,(req,res)=>{
     return account.user_permission(req,res);
})

router.get('/get-all-products',mdware.login_require,(req,res)=>{
     return product.get_all_products(req,res);
})

router.get('/get-product/:id',mdware.login_require,(req,res)=>{
     return product.get_product(req,res);
})

router.get('/get-all-items/:id',mdware.login_require,(req,res)=>{
     return product.get_all_items(req,res);
})

router.get('/get-all-sizes/:id',mdware.login_require,(req,res)=>{
     return product.get_all_sizes(req,res);
})

router.get('/get-carts',mdware.login_require,(req,res)=>{
     return cart.get_carts(req,res);
})

router.get('/get-cart',mdware.login_require,(req,res)=>{
     return cart.get_cart(req,res);
})

router.patch('/change-quantity',mdware.login_require,(req,res)=>{
     return cart.change_quantity(req,res);
})

router.delete('/delete-carts',mdware.login_require,(req,res)=>{
     return cart.delete_carts(req,res);
})

router.post('/add-cart',mdware.login_require,(req,res)=>{
     return cart.add_cart(req,res);
})

router.get('/get-address',mdware.login_require,(req,res)=>{
     return address.get_address(req,res);
})

router.post('/order',mdware.login_require,(req,res)=>{
     return order.add_order(req,res);
})   

router.post('/order-pay',mdware.login_require,(req,res)=>{
    return payment.order_pay(req,res);
})

router.get('/pay-done/:order/:total',(req,res)=>{
     return payment.pay_success(req,res);
})

router.get('/get-orders',mdware.login_require,(req,res)=>{
     return order.get_orders(req,res);
})

router.post('/get-order-cart',mdware.login_require,(req,res)=>{
     return order.get_order_cart(req,res);
})

router.post('/vote',mdware.login_require,(req,res)=>{
     return vote.add_vote(req,res);
})

router.get('/get-vote/:product',mdware.login_require,(req,res)=>{
     return vote.get_vote(req,res);
})

router.post('/add-product',mdware.login_require,(req,res)=>{
     return product.add_product(req,res);
})

router.patch('/update-product',mdware.login_require,(req,res)=>{
     return product.update_product(req,res);
})

router.delete('/delete-products',mdware.login_require,(req,res)=>{
     return product.delete_products(req,res);
})

router.get('/get-all-order',mdware.login_require,(req,res)=>{
     return order.get_all_order(req,res);
})

router.get('/get-all-cart',mdware.login_require,(req,res)=>{
     return cart.get_all_cart(req,res);
})

router.get('/get-all-cartorder',mdware.login_require,(req,res)=>{
     return cart.get_all_cartorder(req,res);
})

router.patch('/change-status',mdware.login_require,(req,res)=>{
     return order.change_status(req,res);
})

router.get('/get-all-items-product/:id',mdware.login_require,(req,res)=>{
     return product.get_all_items_product(req,res);
})

router.post('/add-item',mdware.login_require,(req,res)=>{
     return product.add_item(req,res);
})

router.post('/add-size',mdware.login_require,(req,res)=>{
     return product.add_size(req,res);
})

router.get('/get-all-item/:id',mdware.login_require,(req,res)=>{
     return product.get_all_item(req,res);
})

module.exports = router;