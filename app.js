var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');




var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'usbw',
    database : 'simplepos'
  }
});


var app = express();

app.engine('html', require('atpl').__express);
app.set('view engine','html');
app.set('devel',false)


app.use(bodyParser.urlencoded({ extended: false }));


const PORT=3000;

app.use('/', express.static(__dirname + '/public'));

app.get('/products/',function(req,res){
    knex.select().where('isvisible','=',1).from('products').then(function(products){
        res.render('products/list.html',{'products':products});
    }).catch(function(error){
        res.render('ierror',{'message':error})
    });
});
app.get('/products/:id',function(req,res){
    var id= req.params.id;
    knex.select().where('isvisible',1).andWhere('id',id).from('products').then(function(products){
        console.log(products[0]);
        res.render('products/detail.html',{'product':products[0]});
    }).catch(function(error){
        console.log(error);
        res.render('ierror',{'message':error})
    });
});




app.engine('html', require('atpl').__express);
app.set('view engine','html');
app.set('devel',false);



app.listen(PORT, function(){
    console.log('Listo');
});