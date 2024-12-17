const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  
  
  picture: String,
  brandname : String ,
  description : String
  
});


let Product = mongoose.model('product', productSchema);

module.exports = Product
