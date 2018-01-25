var mongoose=require('mongoose')
var schema=mongoose.Schema

var product = new schema({
  title:String,
  price:Number,
  likes:String
})
module.export=mongoose.model('Product',product)
