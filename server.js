//Inicializamos los paquetes ppedidos paquetes
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
//conectamos a la base de datos
var db = mongoose.connect('mongodb://localhost/swagshop')
//Importamos los modelos delas db
var Product = require('./model/product')
var WishList = require('./model/wishlist')
//Iniciamos los servicios requeridos
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
//cCheck  database
app.post('/product', function(request, response) {
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  //Tambien se puede hacer var product=new Product(request.body)
  product.save(function(err, saveProduct) {
    if (err) {
      response.status(500).send({
        error: 'Could not save the product'
      })
    } else {
      response.status(200).send(saveProduct) //Se puede enviar sin
    }
  })
})
//Fetch items
app.get('/product',function(request,response){
  // var items=db.findOne({});
  // items.forEach(function(element){
  //   console.log(element);
  // })
  Product.find({},function(err,products){
      if(err){
        response.status(500).send({
          error: 'Could not send'
        })
      }else {
        response.status(200).send(products)
      }
  });

});
// Whishlist
// Ges lists
app.get('/wishlist',function(request,response){
  WishList.find({}).populate({path:'products',model:'Product'}).exec(function(err,wishlists){
    if(err){
      response.status_(500).send({error:"Could not fetch list"});

    }else {
      response.send(wishlists);
    }
  })
})
// cREATE LIST
app.post('/wishlist',function(request,response){
  var wishList=new WishList;
  wishList.title=request.body.title;
  wishList.save(function(err,newWishList){
    if(err){
      response.status_(500).send({error:"Could not create list"});

    }else {
      response.send(newWishList);
    }
  })

})
// Update list
app.put('/wishlist/product/add',function(request,response){
  Product.findOne({_id:request.body.productId},function(err,product){
    if(err){
      response.status(500).send({error:"could not add item to wishlist"});
    }else {
      WishList.update({_id:request.body.wishListId},{$addToSet:{products:product._id}},function(err,wishList){
        if(err){
          response.status(500).send({error:"could not add item to wishlist"});
        }else {
          response.send("Succes");
        }
      })
    }
  })
});

//Escuchamos elcalback del servidor
app.listen(3000, function() {
  console.log("Swagshop running on port 3000...");
})
