const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;
const session = require('express-session');
const models = require('./models');
const sequelize = require('sequelize');
const accountRouter = require('./routes/account');
const pgp = require('pg-promise')();


const cn = {
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '963477'
};

 const db = pgp(cn);

app.use(
  session({
    secret: 'This is long and convoluted',
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static("public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    if(req.session.email && req.session.password){
      res.redirect('/Home');
    }
      res.render('index')
  });

  app.listen(port, () => console.log(`App running on port ${port}`));
  
  app.get("/Home", function(req, res) {

    if(req.session.email && req.session.password){

      res.render("Home");

    } else {

      res.redirect('login');
      
    }
  });

  app.get("/userreg", function(req, res)  {
    res.render("userreg");
  });

  app.post('/registration', async function(req, res){
    let FirstName = req.body.FirstName
    let LastName = req.body.LastName
    let Address = req.body.Address
    let City = req.body.City
    let State = req.body.State
    let ZipCode = req.body.ZipCode
    let CompanyPosition = req.body.CompanyPosition
    let Email = req.body.Email
    let Password = req.body.Password
    let PasswordConfirmation = req.body.PasswordConfirmation
    
    models.Users.findOne({
      where:  {
        Email: Email
      }
    }).then((Email) => {
      if(Email) {
        res.status(500).json({ message: 'This Email Already Exists, Please Try Another'})
      
    } else {

    bcrypt.hash(Password, 10, (error, hash) => {
      if(!error) {
        let Users = models.Users.build({
          FirstName: FirstName,
          LastName: LastName,
          Address: Address,
          City: City,
          State: State,
          ZipCode: ZipCode,
          CompanyPosition: CompanyPosition,
          Email: Email,
          Password: hash
        })
        Users.save().then((regsave) => {

          console.log(regsave)
          res.redirect('/login');
        })
        }
    })
    }
  })
})
  
  app.get("/HSE", function(req, res) {
    res.render("HSE");
  });

  app.get("/Training", function(req, res) {
    res.render("Training");
  });

  app.get("/About", function(req, res) {
    res.render("About");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });
  
  app.post("/login", function(req, res) {
    console.log(req.body);
    if (req.session) {
      req.session.email = req.body.email;
      req.session.password = req.body.password;
    }
    res.redirect("/Home");
  });

