const mongoose = require('mongoose')

const modal = mongoose.Schema({
    firstname:String,
    secondname: String,
    email: String,
    phone: String,
    password: String,
    repassword: String, 
    birthdate: String,
})

const UserSchema = mongoose.model('validationusers', modal)
module.exports = UserSchema