const { UserAccount } = require("../models");
const bcrypt = require('bcrypt')

function onHej(req, res){
    res.send('Hejsan')
}

function onLogin(req, res){
    res.send('Hejsan')
}

async function onCreateUser(req, res){

    const {firstName, email, password} = req.body
    const hachedPassword = await bcrypt.hash(password, 10)

    await UserAccount.create({
        firstName,
        email,
        password: hachedPassword
    })
    res.send('Hejsan')
    //Vem är inloggad?? 
    res.status(204).json({email})
}

module.exports = {
    onHej,
    onLogin,
    onCreateUser
}