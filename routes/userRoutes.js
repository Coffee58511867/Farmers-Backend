module.exports = app => {
    const users = require("../controllers/userController");
    const router = require("express").Router();

    // Create a new user
    router.post("/register", users.register);

    router.post("/login", users.login);

    router.get("/read", users.findAll);

    router.delete('/delete/:id', users.delete);

    router.put('/update/:id', users.update);

    app.use('/api/v1/users', router);
}