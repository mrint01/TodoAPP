const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const path = require('path');
const passportConfig = require("./lib/passportConfig");
dotenv.config();
const app = express();
const http = require('http').createServer(app);
  
const PORT = process.env.PORT || 3000;

// MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));


  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  
  app.use(cors());
  app.use(express.json());
  app.use(passportConfig.initialize());


    // Setting up middlewares
  app.use("/auth", require("./routes/authRoutes"));
  app.use("/auth", require("./routes/profileRoutes"));
  app.use("/auth", require("./routes/todosRoutes"));
// ----------- Public Images -----------//

/*
  app.use(express.static(__dirname + "/../client/dist"));
  app.all("*", (req, res) => {
    res.status(200).sendFile(__dirname,  "/../client/dist/index.html");
  });

*/
app.use(express.static((path.join(__dirname + "/../client/dist/td-app"))));
app.use('/', express.static(path.join(__dirname, '/../client//dist/td-app')))
app.get('**', (req, res) => {
  res.sendFile(path.join((__dirname + "/..client/dist/td-app/index.html")));
});

  app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);