module.exports = app => {
    const products = require("../controllers/productController");
    const router = require('express').Router();

    // Create a new product
    router.post("/uploadproduct", products.create);

    // Retrieve all products
    router.get("/readproducts", products.findAll);

    // Update a product
    router.post('/updateproduct/:id', products.update)

    // Delete a product
    router.delete("/deleteproducts/:id", products.delete);

    // Find by id
    router.get("/readproduct/:id", products.find);

    app.use('/api/v1/products', router);
}