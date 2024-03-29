var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);




app.get('/',function(req,res){
  var qParams = [];
  for (var q in req.query){
    qParams.push({'name':q,'value':req.query[q]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('getreceived', context);
});

app.post('/', function(req,res){
  //for the query string content
  var qParams = [];
  for (var q in req.query){
    qParams.push({'name':q,'value':req.query[q]})
  }
  var bParams = [];
  for (var b in req.body){
    bParams.push({'name':b,'value':req.body[b]})
  }
  var context = {};
  context.dataList = qParams;
  context.bodyList = bParams;
  res.render('postreceived', context);

});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
