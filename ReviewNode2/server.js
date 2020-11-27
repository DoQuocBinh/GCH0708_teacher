var express = require('express')
var app= express()

const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

//cho phep doc du lieu tu Textbox
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require('fs');
var fileName = 'data.txt';

app.post('/doLogin',(req,res)=>{
    let nameF = req.body.txtName;
    let passwordF = req.body.txtPassword;
    let file = fs.readFileSync(fileName,'utf8');
    let users = file.split('/');
    //bo user dau tien
    users.shift();
    users.forEach(element => {
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        if(nameF == name && passwordF == password){
            res.end('Ban da dang nhap thanh cong')
            //thoat khoi ham post
            return;
        }
    });
    res.end('Invalid user Name and Password')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/doRegister',(req,res)=>{
    //lay thong tin tu Textbox
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let user = name + ':' + password;
    fs.appendFileSync(fileName, '/' + user);
    res.redirect('/');
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/',(req,res)=>{
    res.render('index');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is runing..' + PORT);