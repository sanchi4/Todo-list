//var data=[{item: 'Learn Java'},{item: 'Get a new passbook'},{item:'kick some coding ass'}];

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var mongoose=require('mongoose');

//databse connection
mongoose.connect('mongodb://test:test@ds131697.mlab.com:31697/todo_sa');

var todoSchema=new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo',todoSchema);

module.exports=function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err, data){
      if(err)throw err;
      res.render('todo',{todos:data});
    });
  });
  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
      if(err)throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err)throw err;
      res.json(data);
    });
  });
};
