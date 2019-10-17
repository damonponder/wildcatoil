const express = require('express');
const router = express.Router();



router.get("/login", function(req, res) {
    if (req.session && req.session.email && req.session.password) {
      res.redirect("/Home");
    }
    res.render("/login")
});
  
router.post("/login", function(req, res) {
  if (req.session) {
    req.session.email = req.body.email;
  }
  res.redirect("/Home");
});


router.get("/Home", (req, res) =>{
    res.render('/Home', { email: req.session.email})
})


router.get('/', function(req, res) {
  if(req.session.email && req.session.password){
    res.redirect("/Home");
  }
  res.render('/');
})


