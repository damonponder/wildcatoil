const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.static("public"));
app.set("view engine", "pug");


app.get("/", function(req, res) {
    res.render("index", { title: "Hey", message: "Hello there!" });
  });

  app.listen(port, () => console.log(`App running on port ${port}`));


  app.get("/about/us", function(req, res) {
    res.render("about", { title: "Hey", message: "Hello there!" });
  });
  
  app.get("/dashboard", function(req, res) {
    res.render("dashboard");
  });
  
  app.get("/login", function(req, res) {
    res.render("login");
  });
  
  app.post("/login", function(req, res) {
    console.log(req.body);
    // check if user's email and password are valid
    // save login state for browser
    res.redirect("/dashboard");
  });