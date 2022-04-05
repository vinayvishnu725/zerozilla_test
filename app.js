const dotenv = require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type"
  );
  next();
});
app.set("trust proxy", 1);

app.use("/api", apiRoutes);



mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then((connection) => {
    if (connection) {
      app.listen(process.env.PORT);

      console.log("Database Connected !!!");
    
      console.log(`zerozilla server running on ${process.env.PORT} !!!`);
    } else {
      console.log("Error while connecting to database");
    }
  })
  .catch((err) => {
    console.log("catched database connection error :", err);
  });
