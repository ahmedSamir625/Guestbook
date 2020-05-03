const Login = require('../Models/Login')
const User = require('../Models/User')
const bcrypt = require('bcrypt');


const handleRegister = (req, res) => {
    const { username, email, name, color, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    const newLogin = new Login({
        username: username,
        hash: hash
    })

    newLogin.save()
        .then(data => {
            const newUser = new User({
                username: username,
                name: name,
                email: email,
                color: color
            });

            newUser.save()
                .then(user => { res.json(user) })
                .catch(err => {
                    Login.findByIdAndDelete({ _id: data._id })
                        .then(res.json(err))
                        .catch(res.json(err))
                })

        })
        .catch(err => { res.status(400).json('username already exist') })

}


const handleSignin = (req, res) => {
    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json('some fields are empty');
    }

    Login.findOne({ username: username })
        .then(data => {

            if (data == null) {
                res.status(400).json('username not found')
            }
            else {
                const isValid = bcrypt.compareSync(password, data.hash);
                if (isValid) {
                    User.findOne({ username: username })
                        .then(user => res.json(user))
                        .catch(_ => res.status(400).json('cannot login'))
                }
                else {
                    res.status(400).json('wrong password');
                }
            }
        })
        .catch(err => res.status(400).json('username not found'))
}


module.exports = {
    handleRegister: handleRegister,
    handleSignin: handleSignin
}