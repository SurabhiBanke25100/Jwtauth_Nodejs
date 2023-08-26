const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { entries } = require("../models/db");
const secretkey = "SHA5678";

async function Register(req, res) {

    const { id, user_name, email, password, confirm_password } = req.body;

    try {
        const existinguser = await entries.findOne({ email });
        if (existinguser) {
            res.status(400).json({ message: "user exists already" });
        }

        //ecrypt passwd
        const hashedpassword = await bcrypt.hash(password, 10);

        //user creation
        const result = await entries.create({
            id: id,
            user_name: user_name,
            email: email,
            password: hashedpassword,
            confirm_password: confirm_password
        });

        const payload = {
            id: result.id,
            user_name: result.user_name,
            email: result.email,
        };

        const options = {
            algorithm: 'HS256'
        };

        //Token generation
        const token = jwt.sign(payload, secretkey, options);
        res.status(201).json({
            access_token: token,
            user: payload
        });

    } catch (error) {
        res.status(500).json({ message: "server error" });
    }

}

module.exports = { Register };