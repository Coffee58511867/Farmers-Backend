const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const product = require("./routes/product");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/app" ,product);

app.get('/', (req,res) => {
  res.send("Farmers API");
})


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
})

// routes
require('./routes/productRoutes')(app);
(userRoutes)(app);

mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Error Connectting To The Database");
    console.error(error);
  });
