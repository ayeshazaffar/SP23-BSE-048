const express = require("express");
let app = express();
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
app.use(express.static("public"));
app.use(express.static("uploads"));


app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let productsRouter = require("./routes/admin/products");
app.use(productsRouter);

let catRout = require("./routes/admin/category")
app.use(catRout)


app.get("/home", async (req, res) => {
  const products = require('./models/product')
  let p = await products.find()
  res.render("home" , {p});
});


app.use(express.urlencoded({ extended: true }));


let connectionString = "mongodb://localhost:27017/pakBrands";


mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Connected To: ${connectionString}`);
  })
  .catch((err) => {
    console.log(err.message);
  });


  app.listen(5500, () => {
    console.log("Server started at localhost:5500");
  });







