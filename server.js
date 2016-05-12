var express = require('express');
var path = require ('path');
var app = express();
var bodyParser = require('body-parser');
var howler = require('howler');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));


app.set('port', (process.env.PORT || 8000));
app.set('/', function (req, res){
	res.send("<h1> Hello World </h1>");
})
app.listen(app.get('port'), function(){
 console.log("listening on port ", app.get('port'));
});
