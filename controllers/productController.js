const products = require('../model/product')
const express = require("express");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null, "./Images/");
  },
  filename: function(req,file, cb){
   cb(null, file.originalname);
  }
})
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({storage : storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})
//const upload = multer({dest: 'Images/'})

const type = upload.single('productimage')


exports.create = type ,async(req,res) => {

    const signup = new products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        delivery: req.body.delivery,
        location: req.body.location,
        email: req.body.email,
        productimage : req.file.path
    })
    signup.save()
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
}

exports.findAll = async(req,res) => {
    products.find({}, (err,result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })

}

exports.find = async(req,res) => {
    products.findById({_id: req.params.id}, (err,result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })

}

exports.delete = async(req,res) => {
   try{
    await products.findByIdAndDelete({_id: req.params.id});
    res.status(201).json("Product deleted")
   }
   catch(err){
    res.status(409).json({message: err.message})
   }
}

exports.update = async(req,res) => {
 
    try{
     await products.findByIdAndUpdate({_id: req.params.id}, {
         $set: req.body
     });
     res.status(201).json("Product Updated")
    }
    catch(err){
     res.status(409).json({message: err.message})
    }
 }