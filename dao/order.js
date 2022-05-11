const e = require('express');
const connect = require('./utils');

const format_date = (date)=>{
     const dt = [date.getFullYear(),date.getMonth()+1,date.getDate()];
     return dt.join('-');
}

const check_quantity = (cart)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM cart INNER JOIN size ON cart.size = size.id AND size.quantity < cart.cart_quantity
           WHERE cartid='${cart[0]}'`;
          for(let i = 1; i < cart.length; i++){
               sql += ` OR cartid='${cart[i]}'`;
          }
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                   if(result.length > 0) rs(false);
                   else rs(true);
               }
          })
     })
}

const update_quantity = (cart)=>{
     console.log(cart);
     return new Promise((rs,rj)=>{
          sql = `SELECT cart.size,cart.cart_quantity,size.quantity FROM cart INNER JOIN size ON cart.size = size.id WHERE cartid='${cart[0]}'`;
          for(let i = 1; i < cart.length; i++){
               sql += ` OR cartid='${cart[i]}'`;
          }
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                   carts = result;
                   console.log(carts);
                   for(let i = 0;  i < carts.length; i++){
                        sql = `UPDATE size SET quantity = '${(Number)(carts[i].cart_quantity) - (Number)(carts[i].quantity)}' WHERE id = '${carts[i].size}'`;
                        connect.query(sql,(error,result)=>{
                             console.log(error,result);
                        })
                   }
                   rs();
               }
          })
     })
}

const add_order = ({customer,address,payment,cart})=>{
     return new Promise((rs,rj)=>{
          check_quantity(cart).then((result)=>{
          if(result == true){
          sql = `INSERT INTO \`order\`(customer,address,order_date,order_status) VALUES(
               '${customer}','${address}','${format_date(new Date())}',0)`
          connect.query(sql,(error)=>{
               if(error) rj(error);
               else{
                    sql = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'yxyelqww_soc' AND TABLE_NAME = 'order'";
                    connect.query(sql,(error,result)=>{
                         if(error) rj(error);
                         else{
                              id = result[0].AUTO_INCREMENT - 1;
                              sql = `INSERT INTO payment(order_item,payment,status) VALUES
                              ('${id}','${payment}',0)`;
                              connect.query(sql,(error,result)=>{
                                   if(error) rj(error);
                                   else{
                                        sql = `INSERT INTO cart_order(order_item,cart) VALUES('${id}','${cart[0]}')`;
                                        for(let i = 1; i < cart.length; i++){
                                             sql += `,('${id}','${cart[i]}')`;
                                        }
                                        connect.query(sql,(error,result)=>{
                                             if(error) rj(error);
                                             sql = `UPDATE cart SET status = 1 WHERE cartid='${cart[0]}'`;
                                             for(let i = 1; i < cart.length; i++){
                                                  sql += ` OR cartid='${cart[i]}'`;
                                             }
                                             connect.query(sql,(error)=>{
                                                  if(error) rj(error);
                                                  else{
                                                       update_quantity(cart).then(()=>{
                                                            rs(id);
                                                       }).catch((error)=>{
                                                            rj(error);
                                                       })
                                                  }
                                             })
                                        })
                                   }
                              })
                         }
                    })
               }
          })}
          else{
               rs(-1);
          }
          }).catch((error)=>{
               rj(error);
          })
     })
}

const get_orders = (customer)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM \`order\` WHERE customer = '${customer}' ORDER BY id DESC`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    rs(result);
               }
          })
     })
}

const get_order_cart = (order)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM cart_order WHERE order_item = '${order[0].id}'`;
          for(let i = 1; i < order.length; i++){
               sql += ` OR order_item = '${order[i].id}'`;
          }
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    rs(result);
               }
          })
     })
}

const get_all_order = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SElECT \`order\`.id,\`order\`.order_status,customer.fullname,address.addr,address.phone,payment.status FROM \`order\` INNER JOIN customer ON customer.account = \`order\`.customer INNER JOIN address ON \`order\`.address = address.id 
          INNER JOIN payment ON payment.order_item = \`order\`.id ORDER BY order_status ASC`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    rs(result);
               }
          })
     })
}

const change_status = (product,status)=>{
     return new Promise((rs,rj)=>{
          sql = `UPDATE \`order\` SET order_status = ${status} WHERE id = '${product}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    if(status < 3){
                         rs(result);
                    }else{
                         sql = `UPDATE payment SET status = 1 WHERE order_item = '${product}'`;
                         connect.query(sql,(error,result)=>{
                              if(error) rj(error);
                              else rs(result)
                         });
                    }
               }
          })
     })
}

module.exports = {
     add_order,
     get_orders,
     get_order_cart,
     get_all_order,
     change_status
}