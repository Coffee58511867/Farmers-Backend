const products = require('../model/product')


exports.create = async(req,res) => {

    const signup = new products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        delivery: req.body.delivery,
        location: req.body.location,
        email: req.body.email
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