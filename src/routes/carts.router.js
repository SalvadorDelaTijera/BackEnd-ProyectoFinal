import { Router } from "express";

const router = Router();
// const express = require("express")

router.get("/carts",(req, res)=>{
  let limit = parseInt(req.query.limit)
  if(!isNaN(limit) && limit > 0){
    return res.json(carts.slice(0, limit));
  }
  res.json(carts);
})

router.get("/carts/:cid")

