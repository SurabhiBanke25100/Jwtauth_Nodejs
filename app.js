const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
//const Usercontroller = require("./Controller/usercontroller");
const { Sequelize, logups } = require("./models/db");
const useroute = require("./routes/useroute");

// Middleware 
app.use(express.json());
app.use(cors());

app.use('/users', useroute);


//server connection
app.listen(port, () => {
    console.log(`Server connected at port: ${port}`);
});