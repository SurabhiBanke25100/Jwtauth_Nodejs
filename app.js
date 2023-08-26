const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const port = 5000;

const Usercontroller = require("./Controller/usercontroller");

const { Sequelize, entries } = require("./models/db");

//middleware 
app.use(express.json());

//cross policy
app.use(cors());

app.post('/users', Usercontroller.Register);


app.listen(port, () => {
    console.log(`server connected at port :${port}`);
})