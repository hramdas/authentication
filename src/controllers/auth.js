//const express = require('express')
// const router = express.Router()
//const app = require('express')

const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/user')

function newToken(user){
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

const register = async function (req, res){
    let user;
    try{
        user = await User.findOne({email : req.body.email})
        if(user) return res.status(400).send({message: 'User already registered'})

        user = await User.create(req.body)
        const token = newToken(user)

        return res.status(200).send({user, token})

    } catch(err){
        return res.status(400).send({message:"sorry for inconvinience"})
    }
}

const login = async (req, res)=>{
    try{
        let user = await User.findOne({email: req.body.email})
        
        if(!user) return res.status(400).send({message: 'Please check user, pass'})

        let match = user.checkPassword(req.body.password)

        if(!match) return res.status(400).send({message: 'Please check user, pass'})

        const token = newToken(user)
        return res.status(200).send({user, token})
        
    } catch(err){
        return res.status(400).send({message: 'Sorry for inconvinience please try again later'})
    }
}

const usersdata = async (req, res)=>{
    const user = await User.find()
    return res.status(200).send(user)
}

module.exports = {register, login, usersdata}