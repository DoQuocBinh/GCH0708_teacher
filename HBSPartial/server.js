var express = require('express')
var app= express()


//const engines = require('consolidate');
//app.engine('hbs',engines.handlebars);
//app.set('views','./views');
var hbs = require('hbs')
app.set('view engine','hbs');
hbs.registerPartials(__dirname +'/views/partials')


app.get('/',(req,res)=>{
    res.render('home',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our Home',
        currentYear: new Date().getFullYear()
    })
})
app.get('/maintenance',(req,res)=>{
    res.render('template',{pageTitle:'About Page',body:'Maintenance body'});
})

app.get('/about',(req,res)=>{
    res.render('template',{pageTitle:'About Page',body:'About us body'});
})

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(msg)=>{
    return msg.toUpperCase();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is runing..' + PORT);