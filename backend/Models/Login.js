const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
    },
})

const Login = mongoose.model('login', LoginSchema);

module.exports = Login;