var express = require('express')
var app= express()

const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

//cho phep doc du lieu tu Textbox
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'))

var fs = require('fs');
var fileName = 'data.txt';

app.post('/doLogin',(req,res)=>{
    let nameF = req.body.txtName;
    let passwordF = req.body.txtPassword;
    let file = fs.readFileSync(fileName,'utf8');
    let users = file.split('/');
    let found= false;
    //bo user dau tien
    users.shift();
    users.forEach(element => {
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        if(nameF == name && passwordF == password){
            found = true;
            //break;
        }
    });
    if(found)
        res.end('Valid user')
    else
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
    let errorNameMsg = null;
    let errorPasswordMsg = null;
    if(name.length <=3)
        errorNameMsg = "Name length >3";
    if(password.length <=6)
        errorPasswordMsg = "Password length>6"
    let errorFound = false;
    if(errorNameMsg !=null || errorPasswordMsg !=null ){
        errorFound = true;
    }
    if(errorFound){//Neu loi xay ra
        let errorMsg ={
            'name': errorNameMsg,
            'password' : errorPasswordMsg
        }
        res.render('register',{error:errorMsg})

    }else{//Cap nhat file
        fs.appendFileSync(fileName, '/' + user);
        res.redirect('/');
    }

   
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/view',(req,res)=>{
    let nameF = req.body.txtName;
    let passwordF = req.body.txtPassword;
    let file = fs.readFileSync(fileName,'utf8');
    let users = file.split('/');
    let userJson = [];
    //bo user dau tien
    users.shift();
    users.forEach(element => {
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        let user = {
            'name' : name,
            'password' : password
        }
        userJson.push(user);
    });
    res.render('view',{model : userJson})

})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is runing..' + PORT);