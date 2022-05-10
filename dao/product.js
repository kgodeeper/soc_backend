const connect = require('../dao/utils');

const get_all_products = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM product`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const get_product = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM product WHERE id='${id}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result[0]);
          })
     })
}

const get_all_items = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM item WHERE product='${id}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const get_all_sizes = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM size WHERE item='${id}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const add_product = (name,brand,year,gender,price,url,desc)=>{
     return new Promise((rs,rj)=>{
          sql = `INSERT INTO product(name,brand,year,gender,price,url,descstr) VALUES(
               '${name}','${brand}','${year}','${gender}','${price}','${url}','${desc}'
          )`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const update_product = (id,name,brand,year,gender,price,url,desc)=>{
     return new Promise((rs,rj)=>{
          sql = `UPDATE product SET
               name='${name}',brand='${brand}',year='${year}',gender='${gender}',price='${price}',url='${url}',descstr='${desc}' WHERE id='${id}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const delete_products = (products)=>{
     return new Promise((rs,rj)=>{
          sql = `DELETE FROM product WHERE id=${products[0]}`;
          for(let i = 1; i < products.length; i++){
               sql +=  ` OR id=${products[i]}`;
          }
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const get_all_items_product = (product)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT item.id, item.color, item.url, size.size, size.quantity FROM item INNER JOIN size ON size.item = item.id WHERE item.product=${product}`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

const get_all_item = (product)=>{
     return new Promise((rs,rj)=>{
          sql =  `SELECT * FROM item WHERE product = ${product}`
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })   
     })
}

const add_item = (product,color,url)=>{
     return new Promise((rs,rj)=>{
          sql = `INSERT INTO item(product,color,url) VALUES('${product}','${color}','${url}')`;
          connect.query(sql,(error,result)=>{
               console.log({error,result});
               if(error) rj(error);
               else rs(result);
          })
     })
}

const add_size = (item,size,quan)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM size WHERE item='${item}' AND size='${size}'`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    if(result.length > 0){
                         rs(false);
                    }else{
                         sql = `INSERT INTO size(item,size,quantity) VALUES('${item}','${size}','${quan}')`;
                         connect.query(sql,(error,result)=>{
                              console.log({error,result});
                              if(error) rj(error);
                              else rs(true);
                         })
                    }
               }
          })
     })
}
module.exports = {
     get_all_products,
     get_product,
     get_all_items,
     get_all_sizes,
     add_product,
     update_product,
     delete_products,
     get_all_items_product,
     add_item,
     get_all_item,
     add_size
}