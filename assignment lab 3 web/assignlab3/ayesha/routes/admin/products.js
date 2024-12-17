const express = require("express");
const multer = require("multer");
const router = express.Router();
const Product = require("../../models/product");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // The directory where files are saved
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename to avoid overwriting
  },
});
const upload = multer({ storage: storage });


 
router.get("/panel", (req, res) => {
  res.render("admin/adminPanel", { layout: "admin/admin-layout" });
});





router.get("/products", async (req, res) => {
  
  let products = await Product.find()  
  return res.render("admin/products", { products, layout: "admin/admin-layout",});
});




router.get("/products/create", (req, res) => {
  res.render("admin/create", { layout: "admin/admin-layout" });
});

router.post("/products/create", upload.single("file"), async (req, res) => {
  // Check if the file is being uploaded
  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).send("No file uploaded.");
  }

  const product = new Product({
    description: req.body.description,
    brandname: req.body.brandname,
    picture: req.file ? req.file.filename : null, // Ensure file is saved and filename is passed
  });

  await product.save();
  res.redirect("/products");
});



router.get("/products/edit/:id", async (req, res) => {
  
    const product = await Product.findById(req.params.id);
    
    res.render("admin/edit-product", { product, layout: "admin/admin-layout" });
  
});


router.post("/products/edit/:id", async (req, res) => {

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    res.redirect("/products");
  
});


router.get("/products/delete/:id", async (req, res) => {
  
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
 
});



module.exports = router;
