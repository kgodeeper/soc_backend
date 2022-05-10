const { response } = require('express');
const productDAO = require('../dao/product');

const get_all_products = (req,res)=>{
     productDAO.get_all_products()
     .then((data)=>{
          res.status(200).json({products:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_product = (req,res)=>{
     let id = req.params.id;
     productDAO.get_product(id)
     .then((data)=>{
          res.status(200).json({product:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_items = (req,res)=>{
     let id = req.params.id;
     productDAO.get_all_items(id)
     .then((data)=>{
          res.status(200).json({items:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_sizes = (req,res)=>{
     let id = req.params.id;
     productDAO.get_all_sizes(id)
     .then((data)=>{
          res.status(200).json({sizes:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const add_product = (req,res)=>{
     const name = req.body.nametxt;
     const brand = req.body.brandtxt;
     const year = req.body.yeartxt;
     const gender = req.body.gendertxt;
     const price = req.body.pricetxt;
     const url = req.body.urltxt;
     const desc = req.body.desctxt;
     productDAO.add_product(name,brand,year,gender,price,url,desc)
     .then(()=>{
          res.status(200).json({status:true});
     })
     .catch((error)=>{
          console.log(error);
          res.status(500).json({error});
     })
}

const update_product = (req,res)=>{
     const id   = req.body.id;
     const name = req.body.nametxt;
     const brand = req.body.brandtxt;
     const year = req.body.yeartxt;
     const gender = req.body.gendertxt;
     const price = req.body.pricetxt;
     const url = req.body.urltxt;
     const desc = req.body.desctxt;
     productDAO.update_product(id,name,brand,year,gender,price,url,desc)
     .then(()=>{
          res.status(200).json({status:true});
     })
     .catch((error)=>{
          console.log(error);
          res.status(500).json({error});
     })
}

const delete_products = (req,res)=>{
     const products = req.body.products;
     productDAO.delete_products(products)
     .then(()=>{
          res.status(200).json({status:true});
     })
     .catch((error)=>{
          console.log(error);
          res.status(500).json({error});
     })
}

const get_all_items_product = (req,res)=>{
     let id = req.params.id;
     productDAO.get_all_items_product(id)
     .then((data)=>{
          res.status(200).json({items:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_item = (req,res)=>{
     let id = req.params.id;
     productDAO.get_all_item(id)
     .then((data)=>{
          res.status(200).json({items:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const add_item = (req,res)=>{
     product = req.body.product;
     color = req.body.color;
     url = req.body.url;
     productDAO.add_item(product,color,url)
     .then(()=>{
          res.status(200).json({status:true});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const add_size = (req,res)=>{
     item = req.body.item;
     size = req.body.size;
     quan = req.body.quan;
     productDAO.add_size(item,size,quan)
     .then((data)=>{
          res.status(200).json({status:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
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
     get_all_item,
     add_item,
     add_size
}