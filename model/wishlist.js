var mongoose=require('mongoose')
var schema=mongoose.Schema
var ObjectId=mongoose.Schema.Types.ObjectId

var wishlist=new schema({
  title:{type:String,default:"My list"},
  products:[{type:ObjectId,ref:'Product'}]
  //en products la referencia debe ser como se exxporto en product
})
module.export=mongoose.model('Wishlist',wishlist)
