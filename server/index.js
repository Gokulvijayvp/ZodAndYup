const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')

const mongoose = require('mongoose')
const UserSchema = require('./modal/Usermodal')

mongoose.connect('mongodb://127.0.0.1:27017/usersdbs')


app.use(cors())
app.use(bodyparser.json())

app.get('/users', async(req,res)=>{
    try {
        const users = await UserSchema.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

app.post('/zodusers', async(req,res)=>{
    try {
        const data = req.body
        const users = await UserSchema(data)
        res.json(users)

        users.save()
    } catch (error) {
        console.log(error)
    }
})

app.post('/yupusers', async(req,res)=>{
    try {
        const data = req.body
        const users = await UserSchema(data)
        res.json(users)
        users.save()
    } catch (error) {
        console.log(error)
    }
})

app.listen(8080, ()=>{
    console.log("port 8080")
})