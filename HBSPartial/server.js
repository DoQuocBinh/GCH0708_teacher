const { debug } = require('console');
var express = require('express')
var app= express()
var fs = require('fs')


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
    //doc file maintain.hbs
    let staticContent = fs.readFileSync('./views/maintain.hbs','utf8');
    let n = ['Ha','Linh','Cuong'];
    let dynamicContent = hbs.compile(staticContent)
    let result = dynamicContent({
        name: n
    })
    res.render('template',{pageTitle:'About Page',body:result});
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

const fileName= 'user.txt'
hbs.registerHelper('findUser',(name)=>{
    let content = fs.readFileSync(fileName,'utf8');
    let users = content.split('/');
    users.shift();
    let userJson = []
    users.forEach(element => {
            let user = {
                name: element.split(':')[0]
            }
            userJson.push(user);
    });
    console.log(userJson.length);
    let found = false;
    for(i=0;i<userJson.length;i++){
        if (userJson[i].name==name){
            found = true;
            break;
        }
    }
    return found;
})



const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is runing..' + PORT);
