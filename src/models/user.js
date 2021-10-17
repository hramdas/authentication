const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true, minlength:5}
},
{
    timestamps:true,
    versionKey:false
})

//while create or update
userSchema.pre('save', function(next){
    if (! this.isModified('password')) return next();
    const hash = bcryptjs.hashSync(this.password, 8)
    this.password = hash
    return next()
})

//hash password before login
userSchema.methods.checkPassword = function(password){
    const match = bcryptjs.compareSync(password, this.password)
    return match
}

module.exports = mongoose.model('user', userSchema)