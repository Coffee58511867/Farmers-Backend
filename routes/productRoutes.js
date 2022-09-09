module.exports = app => {
    const products = require("../controllers/productController");
    const router = require('express').Router();

    // Create a new product
    router.post("/uploadproduct", products.create);

    // Retrieve all products
    router.get("/readproducts", products.findAll);

    // Update a product
    router.put('/update/:id', products.update)

    // Delete a product
    router.delete("/deleteproducts/:id", products.delete);

    // Find by email
    router.get('/readproducts/:email', products.findByEmail);

    app.use('/api/v1/products', router);
}