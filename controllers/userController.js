const { UserAccount } = require("../models");
const bcrypt = require('bcrypt')

async function onHej(req, res){
    const id = req.session.userId
    const user = await UserAccount.findOne({
        where: {id}
    })

    res.json(user)
    res.send('Hejsan')
}

async function onLogin(req, res){
    //1. Ta lösenordet och email från req.body
    //2. lösenordet bcryptas och jämförs med det i databasen
    //3. Dks koppling i session storage
    // mappa cookie -> useraccount.id
    const {email,password} = req.body

    const user = await UserAccount.findOne({
        where: {email}
    });
    if (!user) {
        return res.status(401).json('Could not login');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json('Could not login');
        //HA SAMMA FELMEDDELANDE FÖR ATT GÖRA DET SVÅRARE FÖR EN HACKER. SÄKERHET
    }
    req.session.userId = user.id
     res.json({status:"Yepp"})
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