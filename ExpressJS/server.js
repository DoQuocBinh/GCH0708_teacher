var express = require('express');
var app = express();
var path = require('path')


app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname) + '/index.html');
})

//cho phep doc du lieu tu Texbox
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add',(req,res)=>{
    res.sendFile(path.join(__dirname) + '/add.html')
})

//Post: xu ly du lieu khi nguoi dung gui qua Form
app.post('/doAdd',(req,res)=>{
    //doc du lieu tu form gui den
    let name = req.body.txtName;
    //cap nhat file
    fs.appendFileSync(fileName, ';'+name);
    //chuyen huong den index
    res.redirect('/show');
})

var fs = require('fs');
var fileName = 'data.txt';
app.get('/show',(req,res)=>{
    let data = fs.readFileSync(fileName,'utf8');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    data.split(';').forEach(element => {
        res.write('<li>' + element + '</li>');
    });
    res.write('</ul>');
    res.write('</body>')
    res.end('</html>');
})


var PORT = process.env.PORT || 3000
app.listen(PORT);
console.debug("Server is running " + PORT)
