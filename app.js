var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));


const PORT=3000;

app.use('/', express.static(__dirname + '/public'));

app.engine('html', require('atpl').__express);
app.set('view engine','html');
app.set('devel',false);



app.listen(PORT, function(){
    console.log('Listo');
});