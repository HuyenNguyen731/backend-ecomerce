// import library and modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes")
const bodyParser = require("body-parser")
const cors = require("cors");
const cookieParser = require("cookie-parser");

//load environment variables from file .env
dotenv.config();

//initialize express app and configure port
const app = express();
const port = process.env.PORT || 3001;

//use body-parser middleware to parse request body as JSON
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

//connect to MongoDB
mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running in port " + port);
});
