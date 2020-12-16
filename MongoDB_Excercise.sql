//1
use ProductDB2
//drop
db.products.drop()
//2
db.products.insert([
    {productName:'Ipad',price:200,importedDate: new Date('2020-8-2'),color:'green'},
    {productName:'Iphone',price:150,importedDate: new Date('2020-7-4'),color:'blue'},
    {productName:'IMac',price:222,importedDate: new Date('2020-6-2'),color:'green'},
    {productName:'Ilove you',price:60,importedDate: new Date('2020-8-1'),color:'gray'},
    {productName:'Idol',price:200,importedDate: new Date('2020-8-3'),color:'silver'}
])
//3
db.products.find({color:'blue'})
//4
db.products.find({price: {$gt: 30, $lt:100}})
//5
db.products.find({price: {$gt: 30, $lt:300}}).sort({price:-1})
//6
db.products.updateMany({},{$inc: {price:20}})
//kiem tra lai
db.products.find()
//7 delete
db.products.remove({price: {$lt:2000}})
//8 Tim so
db.products.aggregate([
    {$project: {productName:1,price:1,m :{$month: '$importedDate'}}},
    {$match: {m:8}}
])
