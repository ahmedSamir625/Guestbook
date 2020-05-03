const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    // userid:{
    //     type:Number,
    //     required:true,
    //     unique:true, 
    //     auto:true, 
    // },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    color:{
        type:String,
    }
})

const Users = mongoose.model('users',UsersSchema);

module.exports = Users;