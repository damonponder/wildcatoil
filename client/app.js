const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const session = require('express-session');
const sequelize = require('sequelize');
const accountRouter = require('./routes/account');
const pgp = require('pg-promise')();


const cn = {
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'dgr8ninja',
  password: '9634'
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
    let FirstName = req.body.FN
    let LastName = req.body.LN
    let Address = req.body.address
    let City = req.body.CN
    let State = req.body.SN
    let ZipCode = req.body.ZC
    let CompanyPosition = req.body.CP
    let Password = req.body.pw
    let PasswordConfirmation = req.body.CPW

    try {
      await addUser(FirstName, LastName, Address, City, State, ZipCode, CompanyPosition, Password);
      res.redirect('/login');
    } catch (e) {
      res.send(e);
    }
     
  });

function addUser(FirstName, LastName, Address, City, State, ZipCode, CompanyPosition, Password,) {
    return db.none(`INSERT INTO public."USER" (FirstName, LastName, Address, City, State, ZipCode, CompanyPosition, Password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
      FirstName, LastName, Address, City, State, ZipCode, CompanyPosition, Password
    ]); 
  }
  
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

