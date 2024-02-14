//npx sequelize-cli model:generate --name UserAccount --attributes firstName:string,password:string,email:string

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; // "Radiofrekvens"
const session = require("express-session");

const { UserAccount } = require("./models");
// const {onHej, onLogin} = require(./controllers/userController.js)
const userController = require("./controllers/userController");
const migrationhelper = require("./migrationhelper");
// const { onCreateUser } = require('./config/controllers/userController');

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.get('/hej', userController.onHej)
app.post('/api/useraccount', userController.onCreateUser);

//session är en funktion () om man ser cookie längst ner är det ett objekt

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.get("/hej", (req, res) => {
  //Cookie:n och vem är inloggad? Det är det som är req!
  res.send("Hej du är söt");
});

// console.log(userController.team)

// const requireAuth = (req, res, next) => {
//     if (req.session.userId) {
//         next(); // User is authenticated, continue to next middleware
//     } else {
//         res.status(401).send('login'); // User is not authenticated, redirect to login page
//     }
// }

// app.get('/api/currentUserInfo',requireAuth, async (req,res)=>{
//     let result = {
//         name: 'Stefan',
//         id:11112,
//         age:52
//     }
//      res.json(result)
// });

// app.post('/api/userAccount',userController.postUserAccount);

// app.post('/api/signIn',userController.loginUserAccount);

app.listen(port, async () => {
  await migrationhelper.migrate();
  console.log(`Example app listening2 on port ${port}`);
});
