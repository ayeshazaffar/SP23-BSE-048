const express = require("express");
const router = express.Router();
const Category = require("../../models/category");


router.get("/categories", async (req, res) => {
    
    
      
    const categories = await Category.find();
    res.render("admin/categories", { categories, layout: "admin/admin-layout"});
  
});


router.get("/categories/create", (req, res) => {
  res.render("admin/createCat", { layout: "admin/admin-layout" });
});


router.post("/categories/create", async (req, res) => {

    const newcat = new Category(req.body);
    await newcat.save();
    res.redirect("/categories");
  
});


router.get("/categories/edit/:id", async (req, res) => {
  
    const cat = await Category.findById(req.params.id);
   
    res.render("admin/editcat", { cat, layout: "admin/admin-layout" });
  
});


router.post("/categories/edit/:id", async (req, res) => {
  
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/categories");
  
});


router.get("/categories/delete/:id", async (req, res) => {
 
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
 
  
});

module.exports = router;
