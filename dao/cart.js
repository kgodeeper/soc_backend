const connect = require('./utils');

const get_carts = (account)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM cart 
          INNER JOIN product ON product.id = cart.product INNER JOIN size ON size.id = cart.size INNER JOIN item ON item.id = cart.color
          WHERE status = 0 AND customer='${account}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const get_cart = (account)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM cart 
          INNER JOIN product ON product.id = cart.product INNER JOIN size ON size.id = cart.size INNER JOIN item ON item.id = cart.color
          WHERE customer='${account}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const change_quantity = ({cart,quantity})=>{
     return new Promise((rs,rj)=>{
          sql = `UPDATE cart SET cart_quantity = '${quantity}' WHERE cartid = '${cart}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const delete_carts  = (carts)=>{
     return new Promise((rs,rj)=>{
          sql = `DELETE FROM cart WHERE cartid=${carts[0]}`;
          for(let i = 1; i < carts.length; i++){
               sql += ` OR cartid=${carts[i]}`;
          }
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const add_cart = ({account,color,size,product,quantity})=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM cart WHERE customer='${account}' AND color='${color}'
          AND size = '${size}' AND product='${product}' AND status=0`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    if(result.length > 0 ){
                         cart = result[0].cartid;
                         quantity = result[0].cart_quantity + quantity;
                         change_quantity({cart,quantity}).then(()=>rs()).catch(()=>rj());
                    }else{
                         sql = `INSERT INTO cart(product,cart_quantity,size,color,customer) VALUES(
                              '${product}','${quantity}','${size}','${color}','${account}'
                         )`
                         connect.query(sql,(error,result)=>{
                              if(error) rj(error);
                              else rs(result);
                         })
                    }
               }
          })
     })
}

const get_all_cart = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SElECT * FROM cart`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const get_all_cartorder = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SElECT * FROM cart_order`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
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