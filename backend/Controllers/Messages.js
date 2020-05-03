const Message = require('../Models/Message')


const getMessages = (req, res) => {
    Message.find()
        .then(data => { res.json(data) })
        .catch(err => res.status(200).json('something went wrong', err))
}


const handleAdd = (req, res) => {
    const { date, msg, user, repliedmsgInfo } = req.body

    const message = new Message({
        date,
        user,
        msg,
        repliedmsgInfo
    });

    message.save()
        .then(data => { res.json(data) })
        .catch(err => res.status(400).json('cannot insert the msg'))
}


const handleEdit = (req, res) => {
    const { _id, date, msg } = req.body;

    Message.updateOne({ _id: _id },
        {
            $set: {
                msg: msg,
                date: date
            }
        })
        .then(data => { res.json(data) })
        .catch(err => res.status(400).json('cannot update the msg'))

}

const handleDelete = (req, res) => {
    Message.findByIdAndDelete({ _id: req.body._id })
        .then(result => {
            Message.updateMany({ "repliedmsgInfo._id": req.body._id },
                {
                    $set: {
                        repliedmsgInfo: "deleted message",
                    }
                }
            )
                .then(console.log('msg is deleted from all messages'))
                .catch()
            res.json(result)
        })
        .catch(err => { res.status(400).json('cannot delete the msg') })
}





module.exports = {
    handleAdd: handleAdd,
    handleDelete: handleDelete,
    handleEdit: handleEdit,
    getMessages: getMessages

}
