const { Router } = require("express");
const router = Router();
const Usercontroller = require("../Controller/usercontroller");


//creating route  to create the post method to generate the access token
router.post('/register', Usercontroller.Register);



module.exports = router;