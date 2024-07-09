import { Router } from "express"

const router = Router();

router.get("/products", ( req, res)=>{
  let limit = parseInt(req.query.limit)
  if(!isNaN(limit) && limit > 0){
    return res.json(products.slice(0, limit));
  }
  res.json(products);
});

router.get("/products/:pid", (req, res)=>{
  const productId = parseInt(req.params.pid);
  const product = products.find((product)=> product.id === productId);
  if(product){
    return res.json(product);
  }else{
    res.status(404).json({message: "Producto no encontrado"});
  }
})


