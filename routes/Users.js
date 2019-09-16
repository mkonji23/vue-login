const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../model/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post("/register",(req,res)=>{
    var login_status = ''
    const today = new Date()
    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        password : req.body.password,
        created: today
    }
    //select 구문
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user =>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password = hash
                User.create(userData)
                .then(user =>{
                    res.json({status: user.email+' registered'})
                })
                .catch(err=>{
                    res.send('error: '+err)
                })
            })
        }else{
            res.json({error: 'User already exists'})
        }
    })
    .catch(err=>{
        res.send('error: '+ err)
    })
})

users.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=> {
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.send(token)
            }else{
                //비밀번호 불일치
                res.status(400).json([{error:'Password mismatch!'},{error_code:'wrong_password'}])
            }
        }else{
            res.status(400).json([{error:'User does not exist'},{error_code:'no_user'}])
        }
    })
    .catch(err =>{
        res.status(400).json({error: err})
    })

    
})
//모듈 추출
module.exports = users