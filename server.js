//Inicializamos los paquetes ppedidos paquetes
var express = require('express')
var app=express()
var  bodyParser=require('body-parser')
var mongoose=require('mongoose')
//conectamos a la base de datos
var db=mongoose.connect('mongodb://localhost/swagshop')
//Importamos los modelos delas db
var Product=require('./model/product')
var Wishlist=require('./model/wishlist')
//Iniciamos los servicios requeridos
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
//Escuchamos elcalback del servidor
app.listen(3000,function(){
  console.log("Swagshop running on port 3000...");
})
