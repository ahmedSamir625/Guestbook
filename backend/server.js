const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Messages = require('./Controllers/Messages.js');
const Authentication = require('./Controllers/Authentication.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(
    "mongodb://localhost/GuestbookDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('GuestbookDB is connected...') })


app.get('/messages', (req, res) => { Messages.getMessages(req, res) })

app.post('/addMessage', (req, res) => { Messages.handleAdd(req, res) })

app.put('/editMessage', (req, res) => { Messages.handleEdit(req, res) })

app.delete('/deleteMessage', (req, res) => { Messages.handleDelete(req, res) })

app.post('/register', (req, res) => { Authentication.handleRegister(req, res) })

app.post('/signin', (req, res) => { Authentication.handleSignin(req, res) })


app.listen(process.env.PORT||3000, () => {
    console.log('server is listening to port 3000')
})

