const paypal = require('paypal-rest-sdk');
const paymentDAO = require('../dao/payment');
const path = require('path');

paypal.configure({
     mode: 'sandbox',
     client_id:'AZqUOXqvkERPGZnB85heXRXth2GWNvKC_1siPV1ludfXmPUBO3H5oZTzdQSIScvekBS5ylC3TBmEcsLU',
     client_secret:'EFQaVWNKaBqjSkLYN0HXd8X8JWQIfxPXVvo9YuThWuYyPe-d04SO0qecM2e82jFhFXMp-5GSBcf05XDJ'
})

const order_pay = (req,res)=>{
     order = req.body.order;
     total = req.body.total;
     const create_payment_json = {
          "intent": "sale",
          "payer": {
          "payment_method": "paypal"
          },
          "redirect_urls": {
          "return_url": `https://socbe.herokuapp.com/pay-done/${order}/${total}`,
          "cancel_url": "https://socbe.herokuapp.com/pay-cancel"
          },
          "transactions": [{
          "amount": {
               "currency": "USD",
               "total": total
          }
          }]
     }
     paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
          throw res.sendStatus(500);
          } else {
          for(let i = 0; i< payment.links.length; i++){
               if(payment.links[i].rel === "approval_url"){
                         res.status(200).json({pay_link:payment.links[i].href});
               }
          }
          }
     });
}

const pay_success = (req,res)=>{
     paymentId = req.query.paymentId;
     payerId = req.query.PayerID;
     order = req.params.order;
     total = req.params.total;
     const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
               "amount": {
                    "currency": "USD",
                    "total": total
               }
          }]
     }
     paypal.payment.execute(paymentId,execute_payment_json,async (error)=>{
          if(error) {
          }else{
               paymentDAO.set_pay_success(order,paymentId).then(()=>{
                    return res.sendFile(path.join(__dirname,'../redirect.html'));
               }).catch((error)=>{
                    console.log((error));
                    res.status(500).json({error});
               })
          }
     })
}

module.exports = {
     order_pay,
     pay_success
}