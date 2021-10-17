const express = require('express')
const connect = require('./config/db')

const app = express()
app.use(express.json())



app.listen(2200, async ()=>{
    await connect();
    console.log('listening on port 2200')
})
