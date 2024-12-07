require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const userServer = express()

userServer.use(cors())
userServer.use(express.json())
userServer.use(router)

const PORT = 8080

userServer.listen(PORT,()=>{
    console.log('Server running at PORT:', PORT)  
})

userServer.get('/',(req,res)=>{
    res.status(200).send('Hi, Welcome to USER-SERVER!')
})