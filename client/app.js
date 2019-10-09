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
