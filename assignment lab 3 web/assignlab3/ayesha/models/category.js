const mongoose = require('mongoose');


const categoryschema = new mongoose.Schema({
  
  
  name : String ,
  description : String
  
});


let Category = mongoose.model('category', categoryschema);

module.exports = Category
