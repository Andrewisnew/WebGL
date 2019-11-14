const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 3000;

let jsonParser = bodyParser.json();
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

// Отправляем шейдеры
app.get("/public/:file", (req, res) => {
    console.log(`send ${req.params.file}`);
    res.sendFile(`${__dirname}/public/${req.params.file}`);
});

app.listen(port, () => {
  console.log(`server started, port: ${port}`);
});
