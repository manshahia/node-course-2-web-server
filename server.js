const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});


app.use((req,res,next) => {
  res.render('maintain.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get("/",(req,res) => {
  // res.send('<h1>Hello Express</h1>');
  res.render("home.hbs", {
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to our Website'
  });
});


app.get("/about",(req,res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});


app.get("/bad",(req,res) => {
  res.send({
      errorMessage : "Unable to Open"
  });
});


app.listen(3000, ()=> {
  console.log("server is up and running");
});