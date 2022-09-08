const express = require('express')
const router = express.Router()
const products = require('../model/product')


router.post('/uploadproduct', async(req,res) => {

    const signup = new products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        delivery: req.body.delivery,
        location: req.body.location

    })
    signup.save()
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/readproducts', async(req,res) => {
    products.find({}, (err,result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })

})
router.get('/readproducts/: email', async(req,res) => {
    products.find({}, (err,result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })

})
router.delete('/deleteproducts/:id', async(req,res) => {
   
   try{
    await products.findByIdAndDelete({_id: req.params.id});
    res.status(201).json("Product deleted")
   }
   catch(err){
    res.status(409).json({message: err.message})
   }
})
router.put('/update/:id', async(req,res) => {
 
    try{
     await products.findByIdAndUpdate({_id: req.params.id}, {
         $set: req.body
     });
     res.status(201).json("User Updated")
    }
    catch(err){
     res.status(409).json({message: err.message})
    }
 })


module.exports = router