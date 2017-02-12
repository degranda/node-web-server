const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});



app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n')
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// El res.render me permite ocupar html tempaltes dinamicos
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to the brand new page!!'
  });
});
// El app.use me permite exportar html estaticos
app.use(express.static(__dirname + '/public'));
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});
app.get('/bad', (req,res) => {
  res.send({
    file: 'Not found',
    error: 404
  })
});


app.listen(3000, () => {
  console.log('server us up on port 3000');
});
