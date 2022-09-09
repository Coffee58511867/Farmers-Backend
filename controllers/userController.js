const express = require('express')

const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'dkjshdhjskk';

exports.register = async(req,res) => {
    
       
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    const signup = new user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: securePassword,
    })
    signup.save()
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
}

exports.login = async(req,res) => {
    const {email, password} = req.body
    const users = await user.findOne({email});

    console.log(email, password)

    if(!users){
        return res.send({status: 'Invalid Email Address'})
    }
    if(await bcrypt.compare(password, users.password)){
        const token = jwt.sign(
            {
                id: users._id,
                email: users.email
            },
            JWT_SECRET
        )
        return res.json({ status: 'ok' , data: token})
    }
    res.send({status : 'Username or Password is Incorrect'})
}

exports.findAll = async(req,res) => {
    user.find({}, (err,result) =>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })

}


exports.delete = async(req,res) => {
   
   try{
    await user.findByIdAndDelete({_id: req.params.id});
    res.status(201).json("User deleted")
   }
   catch(err){
    res.status(409).json({message: err.message})
   }
}

exports.update = async(req,res) => {
 
    try{
     await user.findByIdAndUpdate({_id: req.params.id}, {
         $set: req.body
     });
     res.status(201).json("User Updated")
    }
    catch(err){
     res.status(409).json({message: err.message})
    }
}