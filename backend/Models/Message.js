const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    msg: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    user: {
        username: {
            type: String,
            required: true,
        },
        color: {
            type: String,
        }
    },


    repliedmsgInfo: {
        _id:{
            type:String,
        },
        msg: {
            type: String,
        },
        username: {
            type: String,
        },
        color: {
            type: String,
        }
    }
})

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;