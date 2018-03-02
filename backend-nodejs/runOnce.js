var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");

  var ProductsObj = [
  {id: 6, name: 'test6',price: 700,createdAt: '',updatedAt:'',seller:'boudi'},
  {id: 7, name: 'test7',price: 800,createdAt: '',updatedAt:'',seller:'boudi'},
  {id: 8, name: 'test8',price: 900,createdAt: '',updatedAt:'',seller:'boudi'},
  ];

  var usersObj = [
    { username: '1', password: '1',type:'user'},
    { username: '2', password: '2',type:'admin'},
    { username: 'user', password: 'user',type:'user'},
    { username: 'admin', password: 'admin',type:'admin'},
    { username: 'manager', password: 'manager',type:'manager'}
  ];
  var collectionsObj = [
    {name: 'Products', data: null},
    {name: 'Users', data: usersObj},
    // {name: 'Carts', data: cartsObj},
  ];

  for (var i = 0; i < collectionsObj.length; i++){
    if(collectionsObj[i].data == null){
      dbo.createCollection(collectionsObj[i].name , function(err, res){
        if(err) throw err;
        done = true;
      });
    } else {
      dbo.collection(collectionsObj[i].name).insertMany(collectionsObj[i].data,function(err,res) {
        if(err) throw err;
        done = true;
      });
    }
    console.log("Collection: "+collectionsObj[i].name+" created !");
  }
  console.log("Press Control C");
}); 
