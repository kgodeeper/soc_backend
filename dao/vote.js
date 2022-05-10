const e = require('express');
const connect = require('./utils');

const add_vote = ({customer,product,vote,rate,order})=>{
     return new Promise((rs,rj)=>{
          sql = `INSERT INTO vote(customer,product,content,rate) VALUES('${customer}','${product[0]}','${vote}','${rate}')`;
          for(let i = 1; i < product.length; i++){
               sql += `,('${customer}','${product[i]}','${vote}','${rate}')`
          }
          connect.query(sql,(error,result)=>{
               console.log({error,result});
               if(error) rj(error);
               else{
                    sql = `UPDATE \`order\` SET voted = 1 WHERE id='${order}'`
               }
               connect.query(sql,(error,result)=>{
                    console.log({error,result});
                    if(error) rj(error);
                    else rs(result);
               })
          })
     })
}

const get_vote = (product)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM vote INNER JOIN customer ON vote.customer = customer.account WHERE product = ${product}`;
          connect.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result);
          })
     })
}

module.exports = {
     add_vote,
     get_vote
}