const express = require('express')
const connect = require('./config/db')
const {register, login, usersdata} = require('./controllers/auth')

const app = express()
app.use(express.json())

app.post('/register', register)
app.post('/login', login)
app.get('/users', usersdata)


app.listen(2200, async ()=>{
    await connect();
    console.log('listening on port 2200')
})
